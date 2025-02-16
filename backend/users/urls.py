
from django.urls import path,include
from users.views import GoogleLogin,ProfileView ,CustomConfirmEmailView,PasswordChangeView # and optionally your custom callback view
from django.contrib.auth import views as auth_views
from dj_rest_auth.views import PasswordResetConfirmView,LoginView,LogoutView,UserDetailsView,PasswordResetView
from rest_framework_simplejwt.views import TokenVerifyView
from dj_rest_auth.jwt_auth import get_refresh_view


urlpatterns= [
    path('registration/account-confirm-email/<str:key>/', CustomConfirmEmailView.as_view(), name="account_confirm_email"),
    path('registration/', include('dj_rest_auth.registration.urls')),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('user/', UserDetailsView.as_view(), name='user_details'),
    path('profile/', ProfileView.as_view(), name='profile-detail'), 
    path('password/reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password/change/', PasswordChangeView.as_view(), name='password_change'),
    path('password/reset/confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('token/verify/', TokenVerifyView.as_view(), name='verify_token'),
    path('token/refresh/', get_refresh_view().as_view(), name='refresh_token'),
    path('google/login', GoogleLogin.as_view(), name='google_login'),
    ]