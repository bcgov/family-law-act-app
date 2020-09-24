"""
Definition of urls for fpo_api.
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
    path("", RedirectView.as_view(url="api/v1/user-info/")),
    path("api/v1/", include("api.urls")),    
    path("health/", views.health)
]

if (os.getenv("FRONT_END", "prod") == "dev"): 
    urlpatterns.append(path("family-law-act/", RedirectView.as_view(url="http://localhost:8084/family-law-act/")))