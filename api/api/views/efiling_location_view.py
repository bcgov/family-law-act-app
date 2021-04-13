from rest_framework import generics, permissions
from rest_framework.response import Response
from api.efiling import EFilingResources


class EFilingLocationView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        court_locations = EFilingResources().get_courts()
        return Response(court_locations)
