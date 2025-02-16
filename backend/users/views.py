from django.shortcuts import render

# Create your views here.

from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailConfirmation
from django.http import JsonResponse
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import ProfileSerializer

from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:8000/accounts/google/login/"
    client_class = OAuth2Client  # Ensure this is enabled for code exchange
    serializer_class=CustomSocialLoginSerializer



from django.shortcuts import get_object_or_404
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC


class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, request, key, *args, **kwargs):
        try:
            # Try getting the confirmation object
            print("custion")
            confirmation = EmailConfirmationHMAC.from_key(key)
            if not confirmation:
                confirmation = get_object_or_404(EmailConfirmation, key=key)

            # Confirm the email and return JSON response
            confirmation.confirm(request)
            return JsonResponse({"detail": "Email successfully confirmed."}, status=200)

        except Exception as e:
            return JsonResponse({"detail": "Invalid or expired confirmation key.", "error": str(e)}, status=400)

    def dispatch(self, request, *args, **kwargs):
        """Ensure all HTTP methods return JSON responses."""
        if request.method.lower() == "get":
            return self.get(request, *args, **kwargs)
        return JsonResponse({"detail": "Method not allowed."}, status=405)



class ProfileView(generics.GenericAPIView, mixins.CreateModelMixin, mixins.UpdateModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    serializer_class = ProfileSerializer

    def get(self, request):
        """Retrieve the logged-in user's profile."""
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data, status=200)

    def post(self, request, *args, **kwargs):
        """Handles profile creation"""
        return self.create(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """Handles profile update"""
        return self.update(request, *args, **kwargs)


from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.generics import GenericAPIView
from dj_rest_auth.serializers import PasswordChangeSerializer
from dj_rest_auth.views import sensitive_post_parameters_m
class PasswordChangeView(GenericAPIView):
    """
    Calls Django Auth SetPasswordForm save method.

    Accepts the following POST parameters: new_password1, new_password2
    Returns the success/fail message.
    """
    serializer_class = PasswordChangeSerializer
    permission_classes = (IsAuthenticated,)
    authentication_classes=[JWTAuthentication]
    throttle_scope = 'dj_rest_auth'

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': _('New password has been saved.')})