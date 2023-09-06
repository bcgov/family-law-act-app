

import logging
from django.http import HttpResponse

from api.efiling import EFilingRejection
from rest_framework import permissions
from rest_framework import generics


logger = logging.getLogger(__name__)


class EFilingDocumentView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)


    def __init__(self):
        self.efiling_rejection = EFilingRejection()
    


    def get(self, request, package_id, doc_id):
        self.efiling_rejection.generate_header(request)
        pdf_content = self.efiling_rejection.get_efiling_document(package_id, doc_id)

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="Doc.pdf"'
        response.write(pdf_content)

        return response


        
        
        
