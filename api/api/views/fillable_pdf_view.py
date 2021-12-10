import logging
import os

from django.http import HttpResponse, HttpResponseNotFound, HttpResponseBadRequest
from PyPDF2 import PdfFileReader, PdfFileWriter

from rest_framework import permissions
from rest_framework import generics

LOGGER = logging.getLogger(__name__)
no_record_found = "No record found."

class FillablePdfView(generics.GenericAPIView):
    
    permission_classes = (permissions.IsAuthenticated,)

    def create_download_response(self, pdf_content):
        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="report.pdf"'
        response.write(pdf_content)
        return response

    def get(self, request):
       
        pdf_name = request.query_params.get("name")
        if pdf_name is None:
            return HttpResponseBadRequest("Missing parameters.")

        output = PdfFileWriter()
        filepath = os.getcwd()+'/api/fillable_pdfs/'+pdf_name+'.pdf' 
        #TODO  
        print(filepath)
        try:
            read_pdf = PdfFileReader(filepath, 'rb')
        except:
            return HttpResponseNotFound("File "+pdf_name+".pdf Not Found")

        output.cloneReaderDocumentRoot(read_pdf)
        
        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="'+pdf_name+'.pdf"'        
        output.write(response)

        return response

        

   