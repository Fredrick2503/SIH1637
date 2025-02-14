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

    def get_cleaned_data(self):
        """ Returns cleaned data for user creation """
        data = super().get_cleaned_data()
        data.update({
            "phone_number": self.validated_data.get("phone_number", ""),
            "user_type": self.validated_data.get("user_type", ""),
        })
        return data

    def save(self, request):
        """ Saves user and their profile based on user type """
        user = super().save(request)
        user.user_type = self.validated_data.get("user_type")
        user.phone_number = self.validated_data.get("phone_number")
        user.save()

        return user
    


from rest_framework import serializers
from users.models import IndividualProfile, FarmProfile, OrganizationProfile

class IndividualProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualProfile
        fields = ['first_name', 'last_name', 'phone_number']

class FarmProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmProfile
        fields = ['farm_name', 'farm_location', 'farm_size', 'phone_number']

class OrganizationProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationProfile
        fields = ['organization_name', 'organization_type', 'organization_website', 'organization_description', 'phone_number']


class ProfileSerializer(serializers.Serializer):
    # This serializer acts as a wrapper.
    # It doesn’t map directly to a model but returns the appropriate profile data.
    def to_representation(self, instance):
        # instance here is the user
        user_type = instance.user_type
        if user_type == User.INDIVIDUAL:
            serializer = IndividualProfileSerializer(instance.individual_profile)
        elif user_type == User.FARM:
            serializer = FarmProfileSerializer(instance.farm_profile)
        elif user_type == User.ORGANIZATION:
            serializer = OrganizationProfileSerializer(instance.organization_profile)
        else:
            raise serializers.ValidationError("Invalid user type")
        return serializer.data

    def update(self, instance, validated_data):
        user_type = instance.user_type
        if user_type == User.INDIVIDUAL:
            profile = instance.individual_profile
            serializer = IndividualProfileSerializer(profile, data=validated_data, partial=True)
        elif user_type == User.FARM:
            profile = instance.farm_profile
            serializer = FarmProfileSerializer(profile, data=validated_data, partial=True)
        elif user_type == User.ORGANIZATION:
            profile = instance.organization_profile
            serializer = OrganizationProfileSerializer(profile, data=validated_data, partial=True)
        else:
            raise serializers.ValidationError("Invalid user type")

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return instance  # returning the user instance

from rest_framework import generics, permissions
from users.serializers import ProfileSerializer

class ProfileDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()

    def get_object(self):
        # Ensure only the current user's profile is returned.
        return self.request.user


# class CustomregisterView(RegisterView):
#     super().serializer_class=CustomRegisterSerializer

from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.http import HttpResponseBadRequest
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from allauth.socialaccount import app_settings as allauth_account_settings
from allauth.socialaccount.helpers import complete_social_login
from dj_rest_auth.registration.serializers import SocialLoginSerializer as BaseSocialLoginSerializer

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
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.http import HttpResponseBadRequest
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

from allauth.socialaccount import app_settings as allauth_account_settings
from allauth.socialaccount.helpers import complete_social_login
from dj_rest_auth.registration.serializers import SocialLoginSerializer as BaseSocialLoginSerializer

class CustomSocialLoginSerializer(BaseSocialLoginSerializer):
    def validate(self, attrs):





        print("at valiadte")





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

        try:
            # If a code was provided, pass token; otherwise pass a dict with id_token if available.
            login = self.get_social_login(adapter, app, social_token, token if code else {'id_token': attrs.get('id_token')})
            ret = complete_social_login(request, login)
        except Exception as exc:
            import logging
            logger = logging.getLogger(__name__)
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
        print(attrs)
        return attrs
    
