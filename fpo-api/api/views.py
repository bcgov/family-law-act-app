"""
    REST API Documentation for Family Protection Order

    OpenAPI spec version: v1


    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
"""

import asyncio
import json
import os
import random

from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.template.loader import get_template
from django.views.decorators.csrf import csrf_exempt

from wsgiref.util import FileWrapper

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework import mixins
from rest_framework import generics
from rest_framework_bulk import BulkCreateModelMixin
from . import serializers
from auditable.views import AuditableMixin
from .models.Permission import Permission
from .models.Role import Role
from .models.RolePermission import RolePermission
from .models.User import User
from .models.UserRole import UserRole

from api.pdf import render as render_pdf


class permissionsBulkPost(AuditableMixin,BulkCreateModelMixin, generics.GenericAPIView):
  """
  Bulk create / update a number of Permission object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Permission.objects.all()
  serializer_class = serializers.PermissionSerializer
  def post(self, request, *args, **kwargs):
    """
    Creates a number of new Permission objects
    """
    return self.create(request, *args, **kwargs)

class permissionsGet(AuditableMixin,mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
  """
  Lists available Permission objects
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Permission.objects.all()
  serializer_class = serializers.PermissionSerializer
  def get(self, request, *args, **kwargs):
    """
    Lists available Permission objects
    """
    return self.list(request, *args, **kwargs)
  def post(self, request, *args, **kwargs):
    """
    Creates a new Permission object
    """
    return self.create(request, *args, **kwargs)

class permissionsIdDeletePost(AuditableMixin,mixins.DestroyModelMixin, generics.GenericAPIView):
  """
  Deletes a specific Permission object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Permission.objects.all()
  serializer_class = serializers.PermissionSerializer
  def post(self, request, *args, **kwargs):
    """
    Destroys the specified Permission object
    """
    return self.destroy(request, *args, **kwargs)


class permissionsIdGet(AuditableMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
  """
  Gets a specific Permission object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Permission.objects.all()
  serializer_class = serializers.PermissionSerializer
  def get(self, request, *args, **kwargs):
    """
    Retrieves the specified Permission object
    """
    return self.retrieve(request, *args, **kwargs)
  def put(self, request, *args, **kwargs):
    """
    Updates the specified Permission object
    """
    return self.update(request, *args, **kwargs)

class rolesBulkPost(AuditableMixin,BulkCreateModelMixin, generics.GenericAPIView):
  """
  Bulk create / update a number of Role object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Role.objects.all()
  serializer_class = serializers.RoleSerializer
  def post(self, request, *args, **kwargs):
    """
    Creates a number of new Role objects
    """
    return self.create(request, *args, **kwargs)

class rolesGet(AuditableMixin,mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
  """
  Lists available Role objects
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Role.objects.all()
  serializer_class = serializers.RoleSerializer
  def get(self, request, *args, **kwargs):
    """
    Lists available Role objects
    """
    return self.list(request, *args, **kwargs)
  def post(self, request, *args, **kwargs):
    """
    Creates a new Role object
    """
    return self.create(request, *args, **kwargs)

class rolesIdDeletePost(AuditableMixin,mixins.DestroyModelMixin, generics.GenericAPIView):
  """
  Deletes a specific Role object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Role.objects.all()
  serializer_class = serializers.RoleSerializer
  def post(self, request, *args, **kwargs):
    """
    Destroys the specified Role object
    """
    return self.destroy(request, *args, **kwargs)


class rolesIdGet(AuditableMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
  """
  Gets a specific Role object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = Role.objects.all()
  serializer_class = serializers.RoleSerializer
  def get(self, request, *args, **kwargs):
    """
    Retrieves the specified Role object
    """
    return self.retrieve(request, *args, **kwargs)
  def put(self, request, *args, **kwargs):
    """
    Updates the specified Role object
    """
    return self.update(request, *args, **kwargs)

class rolepermissionsBulkPost(AuditableMixin,BulkCreateModelMixin, generics.GenericAPIView):
  """
  Bulk create / update a number of RolePermission object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = RolePermission.objects.all()
  serializer_class = serializers.RolePermissionSerializer
  def post(self, request, *args, **kwargs):
    """
    Creates a number of new RolePermission objects
    """
    return self.create(request, *args, **kwargs)

class rolepermissionsGet(AuditableMixin,mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
  """
  Lists available RolePermission objects
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = RolePermission.objects.all()
  serializer_class = serializers.RolePermissionSerializer
  def get(self, request, *args, **kwargs):
    """
    Lists available RolePermission objects
    """
    return self.list(request, *args, **kwargs)
  def post(self, request, *args, **kwargs):
    """
    Creates a new RolePermission object
    """
    return self.create(request, *args, **kwargs)

class rolepermissionsIdDeletePost(AuditableMixin,mixins.DestroyModelMixin, generics.GenericAPIView):
  """
  Deletes a specific RolePermission object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = RolePermission.objects.all()
  serializer_class = serializers.RolePermissionSerializer
  def post(self, request, *args, **kwargs):
    """
    Destroys the specified RolePermission object
    """
    return self.destroy(request, *args, **kwargs)


class rolepermissionsIdGet(AuditableMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
  """
  Gets a specific RolePermission object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = RolePermission.objects.all()
  serializer_class = serializers.RolePermissionSerializer
  def get(self, request, *args, **kwargs):
    """
    Retrieves the specified RolePermission object
    """
    return self.retrieve(request, *args, **kwargs)
  def put(self, request, *args, **kwargs):
    """
    Updates the specified RolePermission object
    """
    return self.update(request, *args, **kwargs)

class usersBulkPost(AuditableMixin,BulkCreateModelMixin, generics.GenericAPIView):
  """
  Bulk create / update a number of User object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = User.objects.all()
  serializer_class = serializers.UserSerializer
  def post(self, request, *args, **kwargs):
    """
    Creates a number of new User objects
    """
    return self.create(request, *args, **kwargs)

class usersGet(AuditableMixin,mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
  """
  Lists available User objects
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = User.objects.all()
  serializer_class = serializers.UserSerializer
  def get(self, request, *args, **kwargs):
    """
    Lists available User objects
    """
    return self.list(request, *args, **kwargs)
  def post(self, request, *args, **kwargs):
    """
    Creates a new User object
    """
    return self.create(request, *args, **kwargs)

class usersIdDeletePost(AuditableMixin,mixins.DestroyModelMixin, generics.GenericAPIView):
  """
  Deletes a specific User object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = User.objects.all()
  serializer_class = serializers.UserSerializer
  def post(self, request, *args, **kwargs):
    """
    Destroys the specified User object
    """
    return self.destroy(request, *args, **kwargs)


class usersIdGet(AuditableMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
  """
  Gets a specific User object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = User.objects.all()
  serializer_class = serializers.UserSerializer
  def get(self, request, *args, **kwargs):
    """
    Retrieves the specified User object
    """
    return self.retrieve(request, *args, **kwargs)
  def put(self, request, *args, **kwargs):
    """
    Updates the specified User object
    """
    return self.update(request, *args, **kwargs)

class userrolesBulkPost(AuditableMixin,BulkCreateModelMixin, generics.GenericAPIView):
  """
  Bulk create / update a number of UserRole object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = UserRole.objects.all()
  serializer_class = serializers.UserRoleSerializer
  def post(self, request, *args, **kwargs):
    """
    Creates a number of new UserRole objects
    """
    return self.create(request, *args, **kwargs)

class userrolesGet(AuditableMixin,mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
  """
  Lists available UserRole objects
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = UserRole.objects.all()
  serializer_class = serializers.UserRoleSerializer
  def get(self, request, *args, **kwargs):
    """
    Lists available UserRole objects
    """
    return self.list(request, *args, **kwargs)
  def post(self, request, *args, **kwargs):
    """
    Creates a new UserRole object
    """
    return self.create(request, *args, **kwargs)

class userrolesIdDeletePost(AuditableMixin,mixins.DestroyModelMixin, generics.GenericAPIView):
  """
  Deletes a specific UserRole object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = UserRole.objects.all()
  serializer_class = serializers.UserRoleSerializer
  def post(self, request, *args, **kwargs):
    """
    Destroys the specified UserRole object
    """
    return self.destroy(request, *args, **kwargs)


class userrolesIdGet(AuditableMixin,mixins.RetrieveModelMixin, mixins.UpdateModelMixin, generics.GenericAPIView):
  """
  Gets a specific UserRole object
  """
  lookup_field = 'id'
  permission_classes = (permissions.AllowAny,)
  queryset = UserRole.objects.all()
  serializer_class = serializers.UserRoleSerializer
  def get(self, request, *args, **kwargs):
    """
    Retrieves the specified UserRole object
    """
    return self.retrieve(request, *args, **kwargs)
  def put(self, request, *args, **kwargs):
    """
    Updates the specified UserRole object
    """
    return self.update(request, *args, **kwargs)


class surveyPdf(generics.GenericAPIView):
  def post(self, request, name=None):
    tpl_name = 'survey-{}.html'.format(name)
    #return HttpResponseBadRequest('Unknown survey name')

    responses = json.loads(request.POST['data'])
    # responses = {'question1': 'test value'}

    template = get_template(tpl_name)
    html_content = template.render(responses)

    pdf_content = render_pdf(html_content)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    response.write(pdf_content)

    return response
