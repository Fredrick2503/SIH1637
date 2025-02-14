from django.shortcuts import render

# Create your views here.

from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailConfirmation
from django.http import JsonResponse
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from .serializers import *

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:8000/accounts/google/login/"
    client_class = OAuth2Client  # Ensure this is enabled for code exchange
    serializer_class=CustomSocialLoginSerializer


# class CustomConfirmEmailView(ConfirmEmailView):
#     def get(self, *args, **kwargs):
#         # Instead of rendering a template, return JSON
#         confirmation = self.get_object()
#         if confirmation:
#             confirmation.confirm(self.request)
#             return JsonResponse({"detail": "Email confirmed."})
#         return JsonResponse({"detail": "Invalid confirmation."}, status=400)
    
#     def render_to_response(self, context, **response_kwargs):
#         # Override render_to_response to bypass template rendering
#         return JsonResponse(context, **response_kwargs)


from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from allauth.account.models import EmailConfirmation
from rest_framework.views import APIView

class CustomConfirmEmailView(APIView):
    authentication_classes = []  # Adjust as needed
    permission_classes = []      # Adjust as needed

    def get(self, request, *args, **kwargs):
        key = kwargs.get("key")
        confirmation = get_object_or_404(EmailConfirmation, key=key)
        confirmation.confirm(request)
        return JsonResponse({"detail": "Email confirmed."})


class ProfileView(ConfirmEmailView):
    def get(self,request):
        pass
    def post(self,request):
        pass