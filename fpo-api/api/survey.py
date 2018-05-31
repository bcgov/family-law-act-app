from datetime import datetime
import json
import logging
import uuid

from django.conf import settings
from django.http import JsonResponse, HttpResponseBadRequest
#from django.utils.decorators import method_decorator
#from django.views import View
#from django.views.decorators.csrf import csrf_exempt
from rest_framework import permissions
from rest_framework.views import APIView

from api.models import User

LOGGER = logging.getLogger(__name__)


#@method_decorator(csrf_exempt, name='dispatch')
class SurveyCacheView(APIView):
    """Manage in-memory caching of survey results (not saved to database)"""
    permission_classes = (permissions.IsAuthenticated,)

    def get_cache_manager(self):
        return settings.SURVEY_CACHE

    def get_request_user_id(self, request):
        return isinstance(request.user, User) and request.user.authorization_id

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
            if key == 'clear':
                cache_mgr.delete(uid + '-most-recent-' + survey_name)
                key = None
            else:
                newest = cache_mgr.get(uid + '-most-recent-' + survey_name)
                fetch_key = key or newest
                if fetch_key:
                    result = cache_mgr.get(uid + '-survey-' + survey_name + '-' + fetch_key)
                    if result:
                        key = fetch_key
                        if key != 'index':
                            cache_mgr.set(uid + '-most-recent-' + survey_name, key)
        if key == 'index':
            if isinstance(result, list):
                index = []
                for idx_key in result:
                    found = cache_mgr.get(uid + '-survey-' + survey_name + '-' + idx_key)
                    if found:
                        del found['data']
                        found['key'] = idx_key
                        index.append(found)
                result = index
            else:
                result = []
        return JsonResponse({
            'user_id': uid,
            'name': survey_name,
            'key': key,
            'result': result,
            'active': newest})

    def post(self, request, *args, **kwargs):
        uid = self.get_request_user_id(request)
        survey_name = kwargs.get('name')
        if uid:
            cache_mgr = self.get_cache_manager()
            key = kwargs.get('id')
            if not survey_name:
                return HttpResponseBadRequest('Missing survey name')
            survey_name = survey_name[:32]
            body = request.body

            if key:
                key = key[:32]
            else:
                if not body:
                    return HttpResponseBadRequest()
                key = str(uuid.uuid4())[:32]

            cache_key = uid + '-survey-' + survey_name + '-' + key if uid else None

            if not body:
                if cache_key and cache_mgr:
                    cache_mgr.delete(cache_key)
                return JsonResponse({
                    'user_id': uid,
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
                index_key = uid + '-survey-' + survey_name + '-index'
                index = cache_mgr.get(index_key)
                if not isinstance(index, list):
                    index = []
                if key not in index:
                    index.append(key)
                cache_mgr.set(index_key, index)
                return JsonResponse({
                    'user_id': uid,
                    'name': survey_name,
                    'key': key,
                    'status': 'ok'})

        return JsonResponse({
            'user_id': uid,
            'name': survey_name,
            'status': 'error'})
