import base64
import json
import os
import io
import requests
from django.template.loader import get_template
from PIL import Image

PDF_URL = os.environ.get("PDF_SERVICE_URL")


def render(*html):
    """
    Calls the PDF rendering microservice to convert html into
    a PDF file.
    """

    if not PDF_URL:
        raise Exception("PDF_SERVICE_URL environment variable is not set.")

    if len(html) > 1:
        response = requests.post(
            "{}/multiple".format(PDF_URL), data=json.dumps(html), stream=True
        )
    elif html:
        response = requests.post(
            "{}/pdf".format(PDF_URL), data=html[0].encode("utf-8"), stream=True
        )
    else:
        raise Exception("No HTML input provided")

    response.raise_for_status()
    return response.content


def image_to_pdf(data):
    return render(get_template("images_to_pdf.html").render(data))


def rotate_image(file, rotation):
    image = Image.open(file)
    if rotation == 90:
        image_rotated = image.transpose(Image.ROTATE_270)
    elif rotation == 270:
        image_rotated = image.transpose(Image.ROTATE_90)
    elif rotation == 180:
        image_rotated = image.transpose(Image.ROTATE_180)
    else:
        image_rotated = image
    image_bytearray = io.BytesIO()
    image_rotated.save(image_bytearray, format=image.format)
    return image_bytearray.getvalue()


def rotate_images_and_convert_pdf(files, rotations):
    rotated_images = []
    for index, file in enumerate(files):
        rotated_images.append(rotate_image(file, rotations[index]))
    return image_to_pdf(
        {
            "images": [
                {
                    "base64": base64.b64encode(rotated_images[index]).decode("utf-8"),
                    "type": file.name.lower().split(".")[-1],
                }
                for index, file in enumerate(files)
            ]
        }
    )
