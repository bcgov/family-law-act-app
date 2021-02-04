from django.db import models
from core.models import UserBase


class User(UserBase):
    location = models.CharField(max_length=500, blank=True, null=True)
