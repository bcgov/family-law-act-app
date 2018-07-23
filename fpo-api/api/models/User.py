from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    accepted_terms_at = models.DateTimeField(blank=True, null=True)

    # Siteminder headers
    authorization_id = models.CharField(max_length=500, blank=True, null=True)
    authorization_guid = models.UUIDField(unique=True, default=None, null=True)
    authorization_directory = models.CharField(max_length=100, blank=True,
                                               null=True)
    authorization_email = models.EmailField(blank=True, null=True)
    display_name = models.CharField(max_length=500, blank=True, null=True)
