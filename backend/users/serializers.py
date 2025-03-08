from datetime import datetime
from dj_rest_auth.registration.serializers import RegisterSerializer
# from dj_rest_auth.registration.views import RegisterView
from requests import HTTPError
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.http import HttpResponseBadRequest
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from allauth.socialaccount import app_settings as allauth_account_settings
from allauth.socialaccount.helpers import complete_social_login
from dj_rest_auth.registration.serializers import SocialLoginSerializer as BaseSocialLoginSerializer
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.http import HttpResponseBadRequest
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from allauth.socialaccount import app_settings as allauth_account_settings
from allauth.socialaccount.helpers import complete_social_login
from dj_rest_auth.registration.serializers import SocialLoginSerializer as BaseSocialLoginSerializer
from .models import User, IndividualProfile, FarmProfile, OrganizationProfile

User = get_user_model()

class CustomRegisterSerializer(RegisterSerializer):
    """ Custom Registration Serializer to handle different user types """
    phone_number = serializers.CharField(required=False, allow_blank=True)

    def get_cleaned_data(self):
        """ Returns cleaned data for user creation """
        data = super().get_cleaned_data()
        data.update({
            "phone_number": self.validated_data.get("phone_number", ""),
            # "user_type": self.validated_data.get("user_type", "")\,
            # "user_type": self.validated_data.get("user_type", ""),
        })
        return data

    def save(self, request):
        """ Saves user and their profile based on user type """
        user = super().save(request)
        user.user_type = None
        user.phone_number = self.validated_data.get("phone_number")
        user.save()

        return user
    


# class ProfileSerializer(serializers.ModelSerializer):
#     user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES, required=True)
#     user_category = serializers.ChoiceField(choices=User.USER_CATEGORY, required=True)
#     # phone_number = serializers.CharField(required=True)
#     first_name = serializers.CharField(required=False, allow_blank=True)
#     last_name = serializers.CharField(required=False, allow_blank=True)
#     farmName = serializers.CharField(required=False, allow_blank=True)
#     location = serializers.CharField(required=False, allow_blank=True)
#     farmArea = serializers.FloatField(required=False, allow_null=True)
#     organizationName = serializers.CharField(required=False, allow_blank=True)
#     organizationType = serializers.CharField(required=False, allow_blank=True)
#     about=serializers.CharField(required=False,allow_blank=True)
#     tagline=serializers.CharField(required=False,allow_blank=True)
#     profileImg=serializers.ImageField()
#     heroImg=serializers.ImageField()

#     class Meta:
#         model = User
#         fields = ['user_type','user_category','first_name', 'last_name', 'farmName', 'location', 'farmArea', 'organizationName', 'organizationType','about','tagline','profileImg','heroImg']

#     def to_representation(self, instance):
#         """Customize response data based on `user_type`"""
#         data = super().to_representation(instance)
#         data["email"]=instance.email
#         data["phone_no"]=instance.phone_number
#         data["joinedSince"]=instance.date_joined
#         # Get the appropriate profile based on user_type
#         if instance.user_type == User.PRODUCER:
#             if instance.user_category==User.INDIVIDUAL:
#                 profile = IndividualProducerProfile.objects.filter(user=instance).first()
#                 if profile:
#                     data['first_name'] = profile.first_name
#                     data['last_name'] = profile.last_name
#                     data['about']=profile.about
#                     data['tagline']=profile.tagline
#                     data['location'] = profile.location
#                     data['farmArea'] = profile.farmArea
#                     data['rating'] = profile.rating
#                     data['profileImg']=profile.profileImg
#                     data['heroImg']=profile.heroImg
#             if instance.user_category==User.ORGANISATION:
#                 profile = FarmProfile.objects.filter(user=instance).first()
#                 if profile:
#                     data['farmName'] = profile.farmName
#                     data['farmArea'] = profile.farmArea
#                     data['location'] = profile.location
#                     data['about']=profile.about
#                     data['tagline']=profile.tagline
#                     data['rating'] = profile.rating
#                     data['profileImg']=profile.profileImg
#                     data['heroImg']=profile.heroImg

        
#         elif instance.user_type == User.BUYER:
#             if instance.user_category==User.INDIVIDUAL:
#                 profile = IndividualBuyerProfile.objects.filter(user=instance).first()
#                 if profile:
#                     data['first_name'] = profile.first_name
#                     data['last_name'] = profile.last_name
#                     data['about']=profile.about
#                     data['tagline']=profile.tagline
#                     data['location'] = profile.location
#                     data['rating'] = profile.rating
#                     data['profileImg']=profile.profileImg
#                     data['heroImg']=profile.heroImg
#             if instance.user_category==User.ORGANISATION:
#                 profile = OrganizationProfile.objects.filter(user=instance).first()
#                 if profile:
#                     data['organizationName'] = profile.organizationName
#                     data['organisationType'] = profile.organisationType
#                     data['about']=profile.about
#                     data['tagline']=profile.tagline
#                     data['location'] = profile.location
#                     data['rating'] = profile.rating
#                     data['profileImg']=profile.profileImg
#                     data['heroImg']=profile.heroImg
                    

#         return data


#     def save_profile(self, instance, validated_data):
#         user_type = validated_data.pop('user_type', None)
#         user_category = validated_data.pop('user_category', None)
#         # phone_number = validated_data.pop('phone_number', None)
#         if instance.user_type == User.PRODUCER:
#             if instance.user_category==User.INDIVIDUAL:
#                 profile,_ = IndividualProducerProfile.objects.get_or_create(user=instance)
#                 if profile:
#                     profile['first_name'] = validated_data.get('first_name',profile.first_name)
#                     profile['last_name'] = validated_data.get('last_name',profile.last_name)
#                     profile['about']=validated_data.get('about',profile.about)
#                     profile['tagline']=validated_data.get('tagline',profile.tagline)
#                     profile['location'] = validated_data.get('location',profile.location)
#                     profile['farmArea'] = validated_data.get('farmArea',profile.farmArea)
                     
#                     profile['profileImg']=validated_data.get('profileImg',profile.profileImg)
#                     profile['heroImg']=validated_data.get('heroImg',profile.heroImg)
#             if instance.user_category==User.ORGANISATION:
#                 profile = FarmProfile.objects.filter(user=instance).first()
#                 if profile:
#                     profile['farmName'] = validated_data.get('farmName',profile.farmName)
#                     profile['farmArea'] = validated_data.get('farmArea',profile.farmArea)
#                     profile['location'] = validated_data.get('location',profile.location)
#                     profile['about']=validated_data.get('about',profile.about)
#                     profile['tagline']=validated_data.get('tagline',profile.tagline)
                     
#                     profile['profileImg']=validated_data.get('profileImg',profile.profileImg)
#                     profile['heroImg']=validated_data.get('heroImg',profile.heroImg)

        
#         elif instance.user_type == User.BUYER:
#             if instance.user_category==User.INDIVIDUAL:
#                 profile = IndividualBuyerProfile.objects.filter(user=instance).first()
#                 if profile:
#                     profile['first_name'] = validated_data.get('first_name',profile.first_name)
#                     profile['last_name'] = validated_data.get('last_name',profile.last_name)
#                     profile['about']=validated_data.get("about",profile.about)
#                     profile['tagline']=validated_data.get("tagline",profile.tagline)
#                     profile['location'] = validated_data.get('location',profile.location)
                     
#                     profile['profileImg']=validated_data.get('profileImg',profile.profileImg)
#                     profile['heroImg']=validated_data.get('heroImg',profile.heroImg)
#             if instance.user_category==User.ORGANISATION:
#                 profile = OrganizationProfile.objects.filter(user=instance).first()
#                 if profile:
#                     profile['organizationName'] = validated_data.get('organizationName',profile.organizationName)
#                     profile['organisationType'] = validated_data.get('organisationType',profile.organisationType)
#                     profile['about']=validated_data.get('about',profile.about)
#                     profile['tagline']=validated_data.get('tagline',profile.tagline)
#                     profile['location'] = validated_data.get('location',profile.location)
#                     profile['profileImg']=validated_data.get('profileImg',profile.profileImg)
#                     profile['heroImg']=validated_data.get('heroImg',profile.heroImg)
        
#         return instance

#     def create(self, validated_data):
#         return self.save_profile(self.context['request'].user, validated_data)
    
#     def update(self, instance, validated_data):
#         restricted_fields = ['user_type', 'user_category','location','rating']
#         for field in restricted_fields:
#             if field in validated_data:
#                 validated_data.pop(field)
#         return self.save_profile(instance, validated_data)

from rest_framework import serializers
from .models import User, IndividualProducerProfile, IndividualBuyerProfile, FarmProfile, OrganizationProfile

class ProfileSerializer(serializers.ModelSerializer):
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)
    user_category = serializers.ChoiceField(choices=User.USER_CATEGORY)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    farmName = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    farmArea = serializers.FloatField(required=False)
    organizationName = serializers.CharField(required=False, allow_blank=True)
    organizationType = serializers.CharField(required=False, allow_blank=True)
    about = serializers.CharField(required=False, allow_blank=True)
    rating = serializers.FloatField(required=False)
    tagline = serializers.CharField(required=False, allow_blank=True)
    profileImg = serializers.ImageField(required=False, allow_null=True)
    heroImg = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = [
            'user_type', 'user_category', 'first_name', 'last_name', 'farmName', 'location',
            'farmArea', 'organizationName', 'organizationType', 'about', 'tagline',
            'profileImg', 'heroImg','rating'
        ]

    def to_representation(self, instance):
        """Customize response data based on `user_type`"""
        data = super().to_representation(instance)
        data["email"] = instance.email
        data["phone_no"] = instance.phone_number
        data["joinedSince"] = datetime.date(instance.date_joined)

        profile = None

        if instance.user_type == User.PRODUCER:
            if instance.user_category == User.INDIVIDUAL:
                profile = IndividualProducerProfile.objects.filter(user=instance).first()
            elif instance.user_category == User.ORGANISATION:
                profile = FarmProfile.objects.filter(user=instance).first()

        elif instance.user_type == User.BUYER:
            if instance.user_category == User.INDIVIDUAL:
                profile = IndividualBuyerProfile.objects.filter(user=instance).first()
            elif instance.user_category == User.ORGANISATION:
                profile = OrganizationProfile.objects.filter(user=instance).first()
        # else:
        #     data={}
        #     data['msg']="Uninitalized User"
        #     return data
        if profile:
            
            # Assign values dynamically to avoid redundant code
            for field in ['first_name', 'last_name', 'about', 'tagline', 'location', 'farmArea', 'organizationName', 'organizationType']:
                if hasattr(profile, field):
                    data[field] = getattr(profile, field)

            # Handle image fields
            data['profileImg'] = profile.profileImg.url if profile.profileImg else None
            data['heroImg'] = profile.heroImg.url if profile.heroImg else None
        return data

    def save_profile(self, instance, validated_data):
        user_type = validated_data.pop('user_type', None)
        user_category = validated_data.pop('user_category', None)

        profile = None
        if not (instance.user_type and instance.user_category):
            if (user_type and user_category):
                instance.user_type=user_type
                instance.user_category=user_category
                instance.save()
        if instance.user_type == User.PRODUCER:
            if instance.user_category == User.INDIVIDUAL:
                profile, _ = IndividualProducerProfile.objects.get_or_create(user=instance)
            elif instance.user_category == User.ORGANISATION:
                profile, _ = FarmProfile.objects.get_or_create(user=instance)

        elif instance.user_type == User.BUYER:
            if instance.user_category == User.INDIVIDUAL:
                profile, _ = IndividualBuyerProfile.objects.get_or_create(user=instance)
            elif instance.user_category == User.ORGANISATION:
                profile, _ = OrganizationProfile.objects.get_or_create(user=instance)
        
        if profile:
            # Update fields correctly
            print(profile)
            for field in ['first_name', 'last_name', 'about', 'tagline', 'location', 'farmArea', 'organizationName', 'organizationType']:
                if field in validated_data:
                    setattr(profile, field, validated_data[field])

            # Handle images correctly
            if 'profileImg' in validated_data:
                profile.profileImg = validated_data['profileImg']
            if 'heroImg' in validated_data:
                profile.heroImg = validated_data['heroImg']

            profile.save()

        return instance

    def create(self, validated_data):
        print("here")
        return self.save_profile(self.context['request'].user, validated_data)

    def update(self, instance, validated_data):
        # Restrict updates on certain fields
        restricted_fields = ['location', 'rating','joinedSince']
        for field in restricted_fields:
            validated_data.pop(field, None)

        return self.save_profile(instance, validated_data)


class CustomSocialLoginSerializer(BaseSocialLoginSerializer):
    def validate(self, attrs):
        view = self.context.get('view')
        request = self._get_request()

        if not view:
            raise serializers.ValidationError(
                _('View is not defined, pass it as a context variable'),
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError(_('Define adapter_class in view'))

        adapter = adapter_class(request)
        app = adapter.get_provider().app

        access_token = attrs.get('access_token')
        code = attrs.get('code')

        if access_token:
            tokens_to_parse = {'access_token': access_token}
        elif code:
            self.set_callback_url(view=view, adapter_class=adapter_class)
            self.client_class = getattr(view, 'client_class', None)

            if not self.client_class:
                raise serializers.ValidationError(_('Define client_class in view'))

            provider = adapter.get_provider()
            scope = provider.get_scope_from_request(request)
            # Create the OAuth2 client without passing scope_delimiter as keyword arg
            client = self.client_class(
                request,
                app.client_id,
                app.secret,
                adapter.access_token_method,
                adapter.access_token_url,
                self.callback_url,
                scope,
                headers=adapter.headers,
                basic_auth=adapter.basic_auth,
            )
            try:
                token = client.get_access_token(code)
            except Exception as ex:
                raise serializers.ValidationError(_('Failed to exchange code for access token')) from ex
            access_token = token['access_token']
            tokens_to_parse = {'access_token': access_token}
            for key in ['refresh_token', 'id_token', adapter.expires_in_key]:
                if key in token:
                    tokens_to_parse[key] = token[key]
        else:
            raise serializers.ValidationError(
                _('Incorrect input. access_token or code is required.'),
            )

        social_token = adapter.parse_token(tokens_to_parse)
        social_token.app = app

        try:
            # If a code was provided, pass token; otherwise pass a dict with id_token if available.
            login = self.get_social_login(adapter, app, social_token, token if code else {'id_token': attrs.get('id_token')})
            ret = complete_social_login(request, login)
        except Exception as exc:
            raise serializers.ValidationError(_('Error completing social login')) from exc

        if isinstance(ret, HttpResponseBadRequest):
            raise serializers.ValidationError(ret.content)

        if not login.is_existing:
            if allauth_account_settings.UNIQUE_EMAIL:
                account_exists = get_user_model().objects.filter(
                    email=login.user.email,
                ).exists()
                if account_exists:
                    raise serializers.ValidationError(
                        _('User is already registered with this e-mail address.'),
                    )
            login.lookup()
            try:
                login.save(request, connect=True)
            except IntegrityError as ex:
                raise serializers.ValidationError(
                    _('User is already registered with this e-mail address.'),
                ) from ex
            self.post_signup(login, attrs)

        attrs['user'] = login.account.user
        return attrs

class CustomSocialLoginSerializer(BaseSocialLoginSerializer):
    def validate(self, attrs):
        view = self.context.get('view')
        request = self._get_request()

        if not view:
            raise serializers.ValidationError(
                _('View is not defined, pass it as a context variable'),
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError(_('Define adapter_class in view'))

        adapter = adapter_class(request)
        app = adapter.get_provider().app

        access_token = attrs.get('access_token')
        code = attrs.get('code')

        if access_token:
            tokens_to_parse = {'access_token': access_token}
        elif code:
            self.set_callback_url(view=view, adapter_class=adapter_class)
            self.client_class = getattr(view, 'client_class', None)

            if not self.client_class:
                raise serializers.ValidationError(_('Define client_class in view'))

            provider = adapter.get_provider()
            scope = provider.get_scope_from_request(request)
            # Create the OAuth2 client without passing scope_delimiter as keyword arg
            client = self.client_class(
                request,
                app.client_id,
                app.secret,
                adapter.access_token_method,
                adapter.access_token_url,
                self.callback_url,
                scope,
                headers=adapter.headers,
                basic_auth=adapter.basic_auth,
            )
            try:
                token = client.get_access_token(code)
            except Exception as ex:
                import logging
                logger = logging.getLogger(__name__)
                logger.error("Error exchanging code for token: %s", ex, exc_info=True)
                raise serializers.ValidationError(_('Failed to exchange code for access token')) from ex
            access_token = token['access_token']
            tokens_to_parse = {'access_token': access_token}
            for key in ['refresh_token', 'id_token', adapter.expires_in_key]:
                if key in token:
                    tokens_to_parse[key] = token[key]
        else:
            raise serializers.ValidationError(
                _('Incorrect input. access_token or code is required.'),
            )

        social_token = adapter.parse_token(tokens_to_parse)
        social_token.app = app


        print(social_token)
        try:
            if adapter.provider_id == 'google' and not code:
                login = self.get_social_login(adapter, app, social_token,token if code else {'id_token': attrs.get('id_token')})
            else:
                login = self.get_social_login(adapter, app, social_token, token)
            ret = complete_social_login(request, login)
        except Exception as exc:
            import logging
            logger = logging.getLogger(__name__)
            logger.error("Error exchanging code for token: %s", exc, exc_info=True)
            raise serializers.ValidationError(_('Error completing social login')) from exc
        # try:
        #     # If a code was provided, pass token; otherwise pass a dict with id_token if available.
        #     login = self.get_social_login(adapter, app, social_token, token if code else {'id_token': attrs.get('id_token')})
        #     ret = complete_social_login(request, login)
        # except Exception as exc:
        #     import logging
        #     logger = logging.getLogger(__name__)
        #     logger.error("Error exchanging code for token: %s", exc, exc_info=True)
        #     raise serializers.ValidationError(_('Error completing social login')) from exc

        if isinstance(ret, HttpResponseBadRequest):
            raise serializers.ValidationError(ret.content)

        if not login.is_existing:
            if allauth_account_settings.UNIQUE_EMAIL:
                account_exists = get_user_model().objects.filter(
                    email=login.user.email,
                ).exists()
                if account_exists:
                    raise serializers.ValidationError(
                        _('User is already registered with this e-mail address.'),
                    )
            login.lookup()
            try:
                login.save(request, connect=True)
            except IntegrityError as ex:
                raise serializers.ValidationError(
                    _('User is already registered with this e-mail address.'),
                ) from ex
            self.post_signup(login, attrs)

        attrs['user'] = login.account.user
        print(attrs)
        return attrs
    
