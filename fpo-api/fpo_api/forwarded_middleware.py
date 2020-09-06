from django.utils.deprecation import MiddlewareMixin


class XForwardedForPortMiddleware(MiddlewareMixin):
    """
        request.get_host() only uses HTTP_X_FORWARDED_HOST and doesn't include
        HTTP_X_FORWARDED_PORT. Problematic here:
        https://github.com/django/django/blob/stable/3.1.x/django/http/request.py#L106
        This causes django.urls.reverse method to only return a host and no port.
    """
    def process_request(self, request):
        if (
            "HTTP_X_FORWARDED_HOST" in request.META
            and "HTTP_X_FORWARDED_PORT" in request.META
            and request.META["HTTP_X_FORWARDED_PORT"] not in ("80", "443")
        ):
            request.META["HTTP_X_FORWARDED_HOST"] = (
                request.META["HTTP_X_FORWARDED_HOST"]
                + ":"
                + request.META["HTTP_X_FORWARDED_PORT"]
            )
        return None
