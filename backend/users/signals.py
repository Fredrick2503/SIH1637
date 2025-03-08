# # users/signals.py
# from django.conf import settings
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django.core.exceptions import ObjectDoesNotExist

# from users.models import *

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         # Create profile based on user type
#         if instance.user_type == User.PRODUCER:
#             if instance.user_category==User.INDIVIDUAL:
#                 IndividualProducerProfile.objects.create(user=instance)
#             elif instance.user_category==User.ORGANISATION:
#                 FarmProfile.objects.create(user=instance)
#         elif instance.user_type == User.BUYER:
#             if instance.user_category==User.INDIVIDUAL:
#                 IndividualBuyerProfile.objects.create(user=instance)
#             elif instance.user_category==User.ORGANISATION:
#                 OrganizationProfile.objects.create(user=instance)

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def save_profile(sender, instance, **kwargs):
#     # Attempt to save the profile for the given user type.
#     try:
#         if instance.user_type == User.PRODUCER:
#             if instance.user_category==User.INDIVIDUAL:
#                 IndividualProducerProfile.objects.save()
#             elif instance.user_category==User.ORGANISATION:
#                 FarmProfile.save()
#         elif instance.user_type == User.BUYER:
#             if instance.user_category==User.INDIVIDUAL:
#                 IndividualBuyerProfile.objects.save()
#             elif instance.user_category==User.ORGANISATION:
#                 OrganizationProfile.objects.save()
#     except ObjectDoesNotExist:
#         # If profile does not exist, create it.
#         if instance.user_type == User.PRODUCER:
#             if instance.user_category==User.INDIVIDUAL:
#                 IndividualProducerProfile.objects.create(user=instance)
#             elif instance.user_category==User.ORGANISATION:
#                 FarmProfile.objects.create(user=instance)
#         elif instance.user_type == User.BUYER:
#             if instance.user_category==User.INDIVIDUAL:
#                 IndividualBuyerProfile.objects.create(user=instance)
#             elif instance.user_category==User.ORGANISATION:
#                 OrganizationProfile.objects.create(user=instance)
