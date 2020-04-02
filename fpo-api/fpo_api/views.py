
import json
import os

from django.http import HttpResponse
from django.template.loader import get_template

from django.shortcuts import render
from api.models.User import User

# Just for testing
from django.views.decorators.csrf import csrf_exempt

def health(request):
    """
    Health check for OpenShift
    """
    return HttpResponse(User.objects.count())

"""
  End point for all forms.
"""
@csrf_exempt
def form(request):
    """
    request.method  -> Look for POST
    request.GET['name'] -> Care about params????
    request.POST['data'] -> Here is the data
    """
    data = json.loads(request.body)
    name = request.GET['name']
    template = '{}.html'.format(name)

    template = get_template(template)
    html_content = template.render(data)

    #  return HttpResponse(request.GET['name'])
    #  print(data['registryLocation'])
    print(html_content)
    
    return HttpResponse(html_content)
