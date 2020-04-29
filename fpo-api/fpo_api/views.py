from django.http import HttpResponse
from api.models.User import User

# Just for testing
from django.views.decorators.csrf import csrf_exempt


def health(request):
    """
    Health check for OpenShift
    """
    return HttpResponse(User.objects.count())

# Testing
@csrf_exempt
def testing(request):
    """
    request.method  -> Look for POST
    request.content_params -> Care about params????
    request.POST['data'] -> Here is the data
    """
    return HttpResponse("testing")
