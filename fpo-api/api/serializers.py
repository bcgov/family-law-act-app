"""
    REST API Documentation for TheOrgBook

    TheOrgBook is a repository for Verifiable Claims made about Organizations related to a known foundational Verifiable Claim. See https://github.com/bcgov/VON

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

from rest_framework import serializers

from .models.Role import Role
from .models.Permission import Permission
from .models.RolePermission import RolePermission
from .models.User import User
from .models.UserRole import UserRole

class PermissionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Permission
    fields = ('id','code','name','description')

class RoleSerializer(serializers.ModelSerializer):
  class Meta:
    model = Role
    fields = ('id','name','description')

class RolePermissionSerializer(serializers.ModelSerializer):
  class Meta:
    model = RolePermission
    fields = ('id','roleId','permissionId')

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id','givenName','surname','email','userId','guid','authorizationDirectory','effectiveDate','endDate')

class UserRoleSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRole
    fields = ('id','userId','roleId','effectiveDate','endDate')