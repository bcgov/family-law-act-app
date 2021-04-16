
from django.http import (
    Http404
)
from rest_framework import permissions
from rest_framework import generics

from api.models.application import Application
from api.serializers import ApplicationListSerializer


class ApplicationListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ApplicationListSerializer

    def get_application_list_for_user(self, id):
        try:
            return Application.objects.filter(user_id=id)
        except Application.DoesNotExist:
            raise Http404

    def get_queryset(self, format=None):
        return self.get_application_list_for_user(self.request.user.id)
