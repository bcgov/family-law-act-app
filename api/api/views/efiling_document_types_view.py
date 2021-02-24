from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from api.efiling import EFilingResources


class EFilingDocumentTypesView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        document_types = EFilingResources().get_document_types()
        return Response(document_types)
