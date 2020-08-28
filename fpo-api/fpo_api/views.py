
import json
import os

from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.template.loader import get_template
from api.auth import get_login_uri, get_logout_uri
from django.conf import settings

from django.shortcuts import render
from api.models.User import User


from api.pdf import render as render_pdf


# Just for testing
from django.views.decorators.csrf import csrf_exempt

def health(request):
    """
    Health check for OpenShift
    """
    return HttpResponse(User.objects.count())

def login(request):

    """ Check if we are already logged in. If we are don't redirect to SSO. """
    logged_in = isinstance(request.user, User)
    if logged_in:
        return HttpResponseRedirect(settings.FORCE_SCRIPT_NAME)
    return HttpResponseRedirect(get_login_uri(request, next=request.GET["next"]))


def logout(request):
    return HttpResponseRedirect(get_logout_uri(request))

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

    pdf_content = render_pdf(html_content)

    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="report.pdf"'

    response.write(pdf_content)

    return response
