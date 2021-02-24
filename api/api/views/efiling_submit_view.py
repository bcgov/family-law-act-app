import logging
import uuid
from datetime import datetime
from django import HttpResponseBadRequest
from rest_framework import permissions, generics
from rest_framework.response import Response
from api.models import Documents, PreparedPdf
from api.efiling import EFilingPackaging, EFilingParsing, EFilingSubmission
from api.utils import get_application_for_user

logger = logging.getLogger(__name__)


class EFilingSubmitView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def __init__(self):
        self.efiling_parsing = EFilingParsing()
        self.efiling_submission = EFilingSubmission(EFilingPackaging())

    def post(self, request, application_id):
        transaction_id = uuid.uuid4()
        application = get_application_for_user(application_id, request.user.id)
        documents = Documents.objects.get(application_id=application_id)
        prepared_pdf = PreparedPdf.objects.get(id=application.pdf_id)

        # decrypt, documents, combine with prepared_pdf and fill
        files = [documents, prepared_pdf]

        # decrypt? translate and fill
        data = self.efiling_parsing.convert_data_for_efiling(application, request.user.location)

        upload_result = self.efiling_submission.upload_documents(
            request.user.universal_id, transaction_id, files
        )

        # Check for submission_id.
        submission_id = upload_result['submission-id']

        if (submission_id is None):
            # TODO: better message.
            return HttpResponseBadRequest("Document Upload Failed.")

        redirect_url, msg = self.efiling_submission.generate_efiling_url(
            request.user.universal_id, transaction_id, submission_id, data
        )

        if (redirect_url is not None):
            # TODO: Might not want to delete these.
            documents.delete()
            application.filed = datetime.now()
            application.save()

        return Response(redirect_url, msg)
