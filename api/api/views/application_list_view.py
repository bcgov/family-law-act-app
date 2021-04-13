
from django.http import (
    HttpResponseForbidden, Http404
)
from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response

from api.models.application import Application
from api.serializers import ApplicationListSerializer


class ApplicationListView(generics.ListAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get_application_list_for_user(self, id):
        try:
            return Application.objects.filter(user_id=id)
        except Application.DoesNotExist:
            raise Http404

    def get(self, request, format=None):
        user_id = request.user.id
        if not user_id:
            return HttpResponseForbidden("User id not provided")
        applications = self.get_application_list_for_user(user_id)
        serializer = ApplicationListSerializer(applications, many=True)
        return Response(serializer.data)
