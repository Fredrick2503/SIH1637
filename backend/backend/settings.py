"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.1.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from datetime import timedelta
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-cdbkv=6vxxre#d^%om7l2u6j#s^9_s3%@5s#57uus!(6zm5=g7'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'database',
    'marketplace',
    'bid',
    # 'users',
    'django.contrib.sites',

    'rest_framework',
    'rest_framework.authtoken',  # ✅ Add this line
    'dj_rest_auth',  
    'dj_rest_auth.registration',  

    # Allauth apps
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    # 'rest_auth.registration',
    
    # Include providers as needed
    'allauth.socialaccount.providers.google',  # Example for Google OAuth
    # 'allauth.socialaccount.providers.facebook',  # Example for Facebook OAuth
    # ... add more providers as necessary  


    'users.apps.UsersConfig',
]

# to enable jwt 
#Make sure to set the SITE_ID (this is required by django.contrib.sites):
SITE_ID = 1

AUTHENTICATION_BACKENDS = (
    # Needed to login by username in Django admin, regardless of `allauth`
    'django.contrib.auth.backends.ModelBackend',

    # Allauth specific authentication methods, such as login by e-mail
    'allauth.account.auth_backends.AuthenticationBackend',
)

AUTH_USER_MODEL = 'users.User'
# Optional: Allauth settings customization
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'  # Or 'optional' depending on your needs
# Tell allauth that the user model doesn't have a username field.
ACCOUNT_DEFAULT_HTTP_PROTOCOL = "http"  # Use "https" in production
ACCOUNT_EMAIL_VERIFICATION = "optional"  # Or "none"
ACCOUNT_USER_MODEL_USERNAME_FIELD = None

# Do not require a username at signup.
ACCOUNT_USERNAME_REQUIRED = False

# ACCOUNT_AUTHENTICATION_METHOD = "email"
# ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_UNIQUE_EMAIL = True

# Use email as the unique identifier for authentication.
ACCOUNT_LOGIN_METHODS = ('email',)
SOCIALACCOUNT_ADAPTER = 'users.adapters.MySocialAccountAdapter'

# Optionally, ensure email is required.
ACCOUNT_EMAIL_REQUIRED = True

# Optionally, specify a redirect URL after login.
LOGIN_REDIRECT_URL = '/'

ACCOUNT_DEFAULT_HTTP_PROTOCOL = "http"  # Use "https" if in production

#for email in console
ACCOUNT_ADAPTER = "allauth.account.adapter.DefaultAccountAdapter"
ACCOUNT_EMAIL_CONFIRMATION_ANONYMOUS_REDIRECT_URL = None
ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = None





SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,  
    "USER_ID_FIELD": "email"# Ensures tokens are blacklisted on logout
}

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'


REST_AUTH = {
    'REGISTER_SERIALIZER': 'users.serializers.CustomRegisterSerializer',
    'USE_JWT': True,
}


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'allauth.account.middleware.AccountMiddleware', 
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'dbsqlite3',
               
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}


MEDIA_URL='/media/'
MEDIA_ROOT=BASE_DIR/"media"