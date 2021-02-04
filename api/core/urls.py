"""
Definition of urls for the application.
"""
import os

from django.conf.urls import include
from django.urls import path
from django.views.generic import RedirectView
from . import views

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    path("", RedirectView.as_view(url="api/v1/user-info/"), name=""),
    path("health/", views.health),
    path("api/v1/logout/", views.logout)
]

if (os.getenv('DJANGO_SETTINGS_MODULE') == "api.settings"):
    urlpatterns.append(path("api/v1/", include("api.urls")))
