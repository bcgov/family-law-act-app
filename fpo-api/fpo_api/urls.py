"""
Definition of urls for fpo_api.
"""

from django.conf.urls import include, url 
from django.urls import path
from django.views.generic import RedirectView
from . import views

from django.views.decorators.csrf import csrf_exempt

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    #path("", RedirectView.as_view(url="api/v1/user-info/")),
    url(r'^$', RedirectView.as_view(url='api/v1/')),
    url(r'^api/v1/', include('api.urls')),
    url(r'^health$', views.health),
    url(r'^form$', views.form),
]
