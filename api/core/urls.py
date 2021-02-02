"""
Definition of urls for the application.
"""
import os

from django.conf.urls import include, url
from django.urls import path
from django.views.generic import RedirectView
from . import views

from django.views.decorators.csrf import csrf_exempt

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    path("", RedirectView.as_view(url="api/v1/user-info/"), name=""),
    path("api/v1/", include("api.urls")),
    path("health/", views.health)
]
