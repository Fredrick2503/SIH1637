# users/services.py
from django.contrib.auth import get_user_model
from .models import IndividualProducerProfile, FarmProfile, IndividualBuyerProfile, OrganizationProfile

User = get_user_model()

class UserService:
    @staticmethod
    def create_or_update_profile(user, profile_data):
        """
        Business logic to create or update a user's profile based on their user_type and user_category.
        """
        # This logic is currently handled in serializers.py but can be migrated here for cleaner architecture.
        pass
