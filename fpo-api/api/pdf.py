import os
import requests

PDF_URL = os.environ.get('PDF_SERVICE_URL')


def render(html):
    """
    Calls the PDF rendering microservice to convert html into
    a PDF file.
    """

    if not PDF_URL:
        raise Exception('PDF_SERVICE_URL environment variable is not set.')

    response = requests.post('{}/pdf'.format(PDF_URL), data=html, stream=True)
    response.raise_for_status()

    return response.content
