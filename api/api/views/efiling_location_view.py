from rest_framework import generics, permissions
from rest_framework.response import Response
from api.efiling import EFilingResources
from api.models import Location
from django.core.cache import cache


class EFilingLocationView(generics.GenericAPIView):
    permission_classes = (permissions.IsAuthenticated,)

    def populate_locations_with_emails(self, efiling_court_locations):
        locations = list(Location.objects.all())
        for efiling_location_name in efiling_court_locations:
            efiling_location = efiling_court_locations[efiling_location_name]
            for location in locations:
                if efiling_location["location_code"] == location.location_code:
                    efiling_location["email"] = location.email
                    efiling_location[
                        "in_person_filing_location_code"
                    ] = location.in_person_filing_location_code
                    break
        return efiling_court_locations

    def get(self, request):
        court_locations = EFilingResources().get_courts()

        # map to court emails FLA specific.
        if cache.get("locations_with_emails"):
            court_locations = cache.get("locations_with_emails")
        else:
            court_locations = self.populate_locations_with_emails(court_locations)
            cache.set("locations_with_emails", court_locations)
        return Response(court_locations)
