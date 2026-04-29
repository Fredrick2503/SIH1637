from datetime import datetime
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer, JWTSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.http import HttpResponseBadRequest
from django.utils.translation import gettext_lazy as _
from allauth.socialaccount import app_settings as allauth_account_settings
from allauth.socialaccount.helpers import complete_social_login
from dj_rest_auth.registration.serializers import SocialLoginSerializer as BaseSocialLoginSerializer
import logging

from .models import User, IndividualProducerProfile, FarmProfile, IndividualBuyerProfile, OrganizationProfile

User = get_user_model()
logger = logging.getLogger(__name__)

class CustomRegisterSerializer(RegisterSerializer):
    username = None  # Remove username field
    phone_number = serializers.CharField(required=False, max_length=15)
    user_type = serializers.ChoiceField(choices=User.USER_TYPE_CHOICES)
    user_category = serializers.ChoiceField(choices=User.USER_CATEGORY)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    farmName = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    farmArea = serializers.FloatField(required=False, allow_null=True)
    organizationName = serializers.CharField(required=False, allow_blank=True)
    organizationType = serializers.CharField(required=False, allow_blank=True)
    about = serializers.CharField(required=False, allow_blank=True)
    tagline = serializers.CharField(required=False, allow_blank=True)
    profileImg = serializers.ImageField(required=False, allow_null=True)
    heroImg = serializers.ImageField(required=False, allow_null=True)

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data.update({
            "phone_number": self.validated_data.get("phone_number", ""),
            "user_type": self.validated_data.get("user_type", ""),
            "user_category": self.validated_data.get("user_category", "")
        })
        return data

    def save(self, request):
        user = super().save(request)
        user.phone_number = self.validated_data.get("phone_number")
        user.user_type = self.validated_data.get("user_type")
        user.user_category = self.validated_data.get("user_category")
        user.save()

        # Assign profile based on user type
        profile = None
        if user.user_type == User.PRODUCER:
            if user.user_category == User.INDIVIDUAL:
                profile = IndividualProducerProfile.objects.create(user=user)
            elif user.user_category == User.ORGANISATION:
                profile = FarmProfile.objects.create(user=user)
        elif user.user_type == User.BUYER:
            if user.user_category == User.INDIVIDUAL:
                profile = IndividualBuyerProfile.objects.create(user=user)
            elif user.user_category == User.ORGANISATION:
                profile = OrganizationProfile.objects.create(user=user)
        
        if profile:
            profile.first_name = self.validated_data.get("first_name", "")
            profile.last_name = self.validated_data.get("last_name", "")
            profile.about = self.validated_data.get("about", "")
            profile.tagline = self.validated_data.get("tagline", "")
            profile.location = self.validated_data.get("location", "")
            profile.farmArea = self.validated_data.get("farmArea", None)
            profile.organizationName = self.validated_data.get("organizationName", "")
            profile.organizationType = self.validated_data.get("organizationType", "")
            profile.profileImg = self.validated_data.get("profileImg", None)
            profile.heroImg = self.validated_data.get("heroImg", None)
            profile.save()

        return user
    
class CustomUserDetailsSerializer(UserDetailsSerializer):
    def to_representation(self, instance):
        return ProfileSerializer().to_representation(instance)
        
class CustomJWTSerializer(JWTSerializer):
    def to_representation(self, instance):
        data = super().to_representation(instance)
        return data

class CustomLoginSerializer(LoginSerializer):
    username = None
    
    def to_representation(self, instance):
        return super().to_representation(instance)

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
        data = super().to_representation(instance)
        data["email"] = instance.email
        data["phone_no"] = instance.phone_number
        data["joinedSince"] = instance.date_joined.date()

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

        data["role"] = instance.user_type
        data.pop("user_type", None)
        if profile:
            for field in ['first_name', 'last_name', 'about', 'tagline', 'location', 'farmArea', 'organizationName', 'organizationType']:
                if hasattr(profile, field):
                    data[field] = getattr(profile, field)

            data['profileImg'] = profile.profileImg.url if profile.profileImg else None
            data['heroImg'] = profile.heroImg.url if profile.heroImg else None
        return data

    def save_profile(self, instance, validated_data):
        user_type = validated_data.pop('user_type', None)
        user_category = validated_data.pop('user_category', None)

        profile = None
        if not (instance.user_type and instance.user_category):
            if (user_type and user_category):
                instance.user_type = user_type
                instance.user_category = user_category
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
            for field in ['first_name', 'last_name', 'about', 'tagline', 'location', 'farmArea', 'organizationName', 'organizationType']:
                if field in validated_data:
                    setattr(profile, field, validated_data[field])

            if 'profileImg' in validated_data:
                profile.profileImg = validated_data['profileImg']
            if 'heroImg' in validated_data:
                profile.heroImg = validated_data['heroImg']

            profile.save()

        return instance

    def create(self, validated_data):
        return self.save_profile(self.context['request'].user, validated_data)

    def update(self, instance, validated_data):
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

        try:
            if adapter.provider_id == 'google' and not code:
                login = self.get_social_login(adapter, app, social_token, token if code else {'id_token': attrs.get('id_token')})
            else:
                login = self.get_social_login(adapter, app, social_token, token)
            ret = complete_social_login(request, login)
        except Exception as exc:
            logger.error("Error exchanging code for token: %s", exc, exc_info=True)
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
