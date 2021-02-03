from datetime import datetime
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response


class AcceptTermsView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        request.user.accepted_terms_at = datetime.now()
        request.user.save()
        return Response({'ok': True})
