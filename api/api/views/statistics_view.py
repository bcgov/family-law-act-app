import logging

from django.http import (
    HttpResponseForbidden,
)

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from django.utils import timezone 

from api.stats.statistics import statistics_info
from core.auth import user_authorized_for_stats
from core.pdf import render as render_pdf, create_download_response

logger = logging.getLogger(__name__)



class StatisticsView(APIView):

    permission_classes = (permissions.IsAuthenticated,)


    def get(self, request):
        if not user_authorized_for_stats(request):
            return HttpResponseForbidden('Unauthorized User')

        start_date = request.query_params.get("start_date")
        end_date = request.query_params.get("end_date")
        tz = request.query_params.get("tz")

        if (start_date is None) or (start_date == "null"):
            start_date = "2020-01-01"
        if (end_date is None) or (end_date == "null"):
            end_date =  timezone.now().strftime("%Y-%m-%d")
        if (tz is None) or (tz == "null"):
            tz =  0
        else:
            tz = int(tz)        
        
        return Response(statistics_info(start_date, end_date, tz))



    def post(self, request):
        
        html = request.data['html']

        try:                        
            pdf_content = render_pdf(html)

        except Exception as ex:
            logger.error("ERROR: Pdf generation failed %s", ex)
            raise

        return create_download_response(pdf_content)

