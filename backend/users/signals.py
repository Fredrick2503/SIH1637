# users/signals.py
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist

from users.models import User, IndividualProfile, FarmProfile, OrganizationProfile

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile(sender, instance, created, **kwargs):
    if created:
        # Create profile based on user type
        if instance.user_type == User.INDIVIDUAL:
            IndividualProfile.objects.create(user=instance)
        elif instance.user_type == User.FARM:
            FarmProfile.objects.create(user=instance)
        elif instance.user_type == User.ORGANIZATION:
            OrganizationProfile.objects.create(user=instance)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def save_profile(sender, instance, **kwargs):
    # Attempt to save the profile for the given user type.
    try:
        if instance.user_type == User.INDIVIDUAL:
            instance.individual_profile.save()
        elif instance.user_type == User.FARM:
            instance.farm_profile.save()
        elif instance.user_type == User.ORGANIZATION:
            instance.organization_profile.save()
    except ObjectDoesNotExist:
        # If profile does not exist, create it.
        if instance.user_type == User.INDIVIDUAL:
            IndividualProfile.objects.create(user=instance)
        elif instance.user_type == User.FARM:
            FarmProfile.objects.create(user=instance)
        elif instance.user_type == User.ORGANIZATION:
            OrganizationProfile.objects.create(user=instance)
