import json
import os
import requests

PDF_URL = os.environ.get('PDF_SERVICE_URL')


def render(*html):
    """
    Calls the PDF rendering microservice to convert html into
    a PDF file.
    """

    if not PDF_URL:
        raise Exception('PDF_SERVICE_URL environment variable is not set.')

    if len(html) > 1:
        data = json.dumps(html)
        response = requests.post('{}/multiple'.format(PDF_URL), data=json.dumps(html), stream=True)
    elif html:
        response = requests.post('{}/pdf'.format(PDF_URL), data=html[0].encode("utf-8"), stream=True)
    else:
        raise Exception('No HTML input provided')

    response.raise_for_status()
    return response.content
