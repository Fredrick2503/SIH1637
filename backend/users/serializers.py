from dj_rest_auth.registration.serializers import RegisterSerializer
# from dj_rest_auth.registration.views import RegisterView
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import IndividualProfile, FarmProfile, OrganizationProfile

User = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    """ Custom Registration Serializer to handle different user types """

    USER_TYPE_CHOICES = [
        ('individual', 'Individual'),
        ('farm', 'Farm'),
        ('organization', 'Organization'),
    ]

    user_type = serializers.ChoiceField(choices=USER_TYPE_CHOICES, required=True)
    phone_number = serializers.CharField(required=False, allow_blank=True)

    # Fields for Individuals
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    # Fields for Farms
    farm_name = serializers.CharField(required=False, allow_blank=True)
    farm_location = serializers.CharField(required=False, allow_blank=True)
    farm_size = serializers.FloatField(required=False, allow_null=True)

    # Fields for Organizations
    organization_name = serializers.CharField(required=False, allow_blank=True)
    organization_type = serializers.CharField(required=False, allow_blank=True)
    organization_website = serializers.URLField(required=False, allow_blank=True)
    organization_description = serializers.CharField(required=False, allow_blank=True)

    def get_cleaned_data(self):
        """ Returns cleaned data for user creation """
        data = super().get_cleaned_data()
        data.update({
            "phone_number": self.validated_data.get("phone_number", ""),
            "user_type": self.validated_data.get("user_type", ""),
            "first_name": self.validated_data.get("first_name", ""),
            "last_name": self.validated_data.get("last_name", ""),
            "farm_name": self.validated_data.get("farm_name", ""),
            "farm_location": self.validated_data.get("farm_location", ""),
            "farm_size": self.validated_data.get("farm_size", None),
            "organization_name": self.validated_data.get("organization_name", ""),
            "organization_type": self.validated_data.get("organization_type", ""),
            "organization_website": self.validated_data.get("organization_website", ""),
            "organization_description": self.validated_data.get("organization_description", ""),
        })
        return data

    def save(self, request):
        """ Saves user and their profile based on user type """
        user = super().save(request)
        user.user_type = self.validated_data.get("user_type")
        user.phone_number = self.validated_data.get("phone_number")
        user.save()

        # Create profile based on user type
        if user.user_type == 'individual':
            IndividualProfile.objects.create(
                user=user,
                first_name=self.validated_data.get('first_name', ''),
                last_name=self.validated_data.get('last_name', '')
            )

        elif user.user_type == 'farm':
            FarmProfile.objects.create(
                user=user,
                farm_name=self.validated_data.get('farm_name', ''),
                farm_location=self.validated_data.get('farm_location', ''),
                farm_size=self.validated_data.get('farm_size', None)
            )

        elif user.user_type == 'organization':
            OrganizationProfile.objects.create(
                user=user,
                organization_name=self.validated_data.get('organization_name', ''),
                organization_type=self.validated_data.get('organization_type', ''),
                organization_website=self.validated_data.get('organization_website', ''),
                organization_description=self.validated_data.get('organization_description', '')
            )

        return user
    

# class CustomregisterView(RegisterView):
#     super().serializer_class=CustomRegisterSerializer