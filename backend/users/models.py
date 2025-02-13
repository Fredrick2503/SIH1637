from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    """ Base user model for all user types """
    INDIVIDUAL = 'individual'
    FARM = 'farm'
    ORGANIZATION = 'organization'
    
    USER_TYPE_CHOICES = [
        (INDIVIDUAL, 'Individual'),
        (FARM, 'Farm'),
        (ORGANIZATION, 'Organization'),
    ]
    email = models.EmailField(unique=True,primary_key=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    # REQUIRED_FIELDS = ['phone_number']

    def __str__(self):
        return self.email

# -----------------------------
# **Individual Buyer or Farmer**
# -----------------------------

class IndividualProfile(models.Model):
    """ Profile for individual farmers & buyers """
    phone_number = models.CharField(max_length=20, unique=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="individual_profile")
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# -----------------------------
# **Farm Model**
# -----------------------------

class FarmProfile(models.Model):
    """ Profile for farms listing produce """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="farm_profile")
    phone_number = models.CharField(max_length=20, unique=False)
    farm_name = models.CharField(max_length=255)
    farm_location = models.TextField()
    farm_size = models.FloatField(help_text="Size in acres or hectares", null=True, blank=True)

    def __str__(self):
        return self.farm_name

# -----------------------------
# **Organization Model**
# -----------------------------

class OrganizationProfile(models.Model):
    """ Profile for organizations like wholesalers, hotels, etc. """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="organization_profile")
    organization_name = models.CharField(max_length=255)
    organization_type = models.CharField(max_length=255, help_text="Wholesaler, Hotel, Retailer, etc.")
    organization_website = models.URLField(blank=True, null=True)
    organization_description = models.TextField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, unique=False)

    def __str__(self):
        return self.organization_name
