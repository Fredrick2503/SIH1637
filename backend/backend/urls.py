# """
# URL configuration for backend project.

# The `urlpatterns` list routes URLs to views. For more information please see:
#     https://docs.djangoproject.com/en/5.1/topics/http/urls/
# Examples:
# Function views
#     1. Add an import:  from my_app import views
#     2. Add a URL to urlpatterns:  path('', views.home, name='home')
# Class-based views
#     1. Add an import:  from other_app.views import Home
#     2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
# Including another URLconf
#     1. Import the include() function: from django.urls import include, path
#     2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
# """
# from django.urls import path,include
# import users
# from users.views import CustomConfirmEmailView,GoogleLogin,MyOAuth2CallbackView
# from dj_rest_auth.registration.views import SocialLoginView
# from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter,LoginByTokenView
# LoginByTokenView=LoginByTokenView.as_view()
# import users.views
# from allauth.socialaccount.providers.google.views import oauth2_callback
# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('auth/', include('dj_rest_auth.urls')),
#     # path('auth/registration/', include('dj_rest_auth.registration.urls')),
#     path('auth/registration/', include('dj_rest_auth.registration.urls')),
#     path('auth/social/', include('allauth.socialaccount.urls')),
#     path('auth/google/', GoogleLogin.as_view(), name='google_login'),
#     # path('accounts/google/callback/', oauth2_callback, name='google_callback'),
#     # path('accounts/google/login/callback/', users.views.MyOAuth2CallbackView , name='socialaccount_callback'),
#     # path('accounts/google/login/token/', LoginByTokenView , name='socialaccount_callback'),
#     # path('accounts/', include('allauth.urls')), 
#     # path("resources/",include("database.urls"),name="resources")
# ]



# urls.py
from django.contrib import admin
from django.urls import path, include
from users.views import GoogleLogin,ProfileDetailView ,CustomConfirmEmailView # and optionally your custom callback view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('accounts/google/login/', GoogleLogin.as_view(), name='google_login'),
    path('accounts/profile/', ProfileDetailView.as_view(), name='profile-detail'),
    path('auth/registration/account-confirm-email/<str:key>/', CustomConfirmEmailView.as_view(), name="account_confirm_email"),
    # Optionally, include a callback URL if using one:
    # path('accounts/google/callback/', MyOAuth2CallbackView.as_view(), name='socialaccount_callback'),
]
