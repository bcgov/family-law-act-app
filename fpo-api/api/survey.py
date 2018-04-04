import json
import logging
import uuid

from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

LOGGER = logging.getLogger(__name__)


@method_decorator(csrf_exempt, name='dispatch')
class SurveyCacheView(View):
    """Manage in-memory caching of survey results (not saved to database)"""

    def get_cache_manager(self):
        return settings.SURVEY_CACHE

    def get_request_user_id(self, request):
        # must set OVERRIDE_USER_ID to enable cache during testing
        if settings.OVERRIDE_USER_ID:
            return settings.OVERRIDE_USER_ID

        # fetch SiteMinder user ID
        header_user_id = request.META.get('HTTP_SMAUTH_UNIVERSALID', '').lower() or None
        return header_user_id

    def get(self, request, *args, **kwargs):
        cache_mgr = self.get_cache_manager()
        survey_name = kwargs.get('name')
        if not survey_name:
            return HttpResponseBadRequest('Missing survey name')
        survey_name = survey_name[:32]
        key = kwargs.get('id')
        uid = self.get_request_user_id(request)
        newest = None
        result = None
        if key:
            key = key[:32]
        if uid and cache_mgr:
            fetch_key = key
            newest = cache_mgr.get(uid + '-most-recent-' + survey_name)
            if not fetch_key:
                fetch_key = newest
            if fetch_key:
                result = cache_mgr.get(uid + '-survey-' + survey_name + '-' + fetch_key)
                if result:
                    key = fetch_key
        return JsonResponse({
            'uid': uid,
            'name': survey_name,
            'key': key,
            'result': result,
            'newest': newest})

    def post(self, request, *args, **kwargs):
        cache_mgr = self.get_cache_manager()
        survey_name = kwargs.get('name')
        key = kwargs.get('id')
        if not survey_name:
            return HttpResponseBadRequest('Missing survey name')
        survey_name = survey_name[:32]
        uid = self.get_request_user_id(request)
        body = request.body

        if key:
            key = key[:32]
        else:
            if not body:
                return HttpResponseBadRequest()
            key = str(uuid.uuid4())

        cache_key = uid + '-survey-' + survey_name + '-' + key if uid else None

        LOGGER.error(body)
        if not body:
            if cache_key and cache_mgr:
                cache_mgr.delete(cache_key)
            return JsonResponse({
                'uid': uid,
                'name': survey_name,
                'key': None,
                'status': 'clear'})

        try:
            survey = json.loads(body)
        except json.decoder.JSONDecodeError:
            survey = None
        if not survey:
            return HttpResponseBadRequest()

        if cache_key and cache_mgr:
            cache_mgr.set(cache_key, survey)
            cache_mgr.set(uid + '-most-recent-' + survey_name, key)
            return JsonResponse({
                'uid': uid,
                'name': survey_name,
                'key': key,
                'status': 'ok'})
        return JsonResponse({
            'uid': uid,
            'name': survey_name,
            'status': 'error'})
