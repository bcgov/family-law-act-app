from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse


class JsonMessageResponse(JsonResponse):
    def __init__(
        self,
        data,
        encoder=DjangoJSONEncoder,
        safe=True,
        json_dumps_params=None,
        **kwargs
    ):
        data = {"message": data}
        super().__init__(
            data, encoder=DjangoJSONEncoder, safe=True, json_dumps_params=None, **kwargs
        )
