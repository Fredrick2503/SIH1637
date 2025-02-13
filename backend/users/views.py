from django.shortcuts import render

# Create your views here.

from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailConfirmation
from django.http import JsonResponse
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://127.0.0.1:8000/accounts/google/callback/"
    client_class = OAuth2Client  # Ensure this is enabled for code exchange


class CustomConfirmEmailView(ConfirmEmailView):
    def get(self, *args, **kwargs):
        # Instead of rendering a template, return JSON
        confirmation = self.get_object()
        if confirmation:
            confirmation.confirm(self.request)
            return JsonResponse({"detail": "Email confirmed."})
        return JsonResponse({"detail": "Invalid confirmation."}, status=400)
    


# myapp/views.py
from django.http import JsonResponse, HttpResponseRedirect
from allauth.socialaccount.providers.oauth2.views import OAuth2CallbackView
from django.views.generic import View

class MyOAuth2CallbackView(OAuth2CallbackView):
    def dispatch(self, request, *args, **kwargs):
        # Process the login as usual.  
        response = super().dispatch(request, *args, **kwargs)
        
        # For example, check if you want a JSON response (perhaps based on a query parameter).
        if request.GET.get("format") == "json" or True:
            # You might pass along some useful data (like a token)
            data = {
                "success": True,
                "message": "Social login successful",
                # 'tokens': tokens,
                "redirect_url": "https://yourfrontend.com/profile/complete"
            }
            return JsonResponse(data)
        
        # Otherwise, proceed with the normal redirect.
        return response
    

MyOAuth2CallbackView=MyOAuth2CallbackView.adapter_view(GoogleOAuth2Adapter)

