# myapp/adapters.py
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter

class MySocialAccountAdapter(DefaultSocialAccountAdapter):
    def get_connect_redirect_url(self, request, socialaccount):
        """
        This method is called after a successful social login.
        You can adjust the URL here to send the user back to your frontend.
        For instance, you might include a token or a flag indicating success.
        """
        def pre_social_login(self, request, sociallogin):
        # Skip the assertion for existing accounts
            if sociallogin.is_existing:
                # Optionally, perform additional actions (e.g., update tokens)
                pass
            # Otherwise, continue with the normal flow.
