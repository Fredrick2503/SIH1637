from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator
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
    PRODUCER="producer"
    BUYER="buyer"
    
    USER_TYPE_CHOICES = [
        (PRODUCER, 'Producer'),
        (BUYER, 'Buyer'),
    ]
    INDIVIDUAL="individual"
    ORGANISATION="organisation"
    USER_CATEGORY=[
        (INDIVIDUAL,"Individual"),(ORGANISATION,"Organisation")
    ]
    phone_number = models.CharField(max_length=20, unique=False)
    email = models.EmailField(unique=True,primary_key=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES,null=True)
    user_category=models.CharField(max_length=25,choices=USER_CATEGORY,null=True)
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
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="individual_profile")
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    tagline=models.CharField(max_length=30)
    about=models.CharField(max_length=50)
    rating=models.DecimalField(max_digits=5, decimal_places=0,default=0,validators=[MinValueValidator(0),MaxValueValidator(5)])
    profileImg=models.ImageField(upload_to="profile/IMG/",null=True,blank=True)
    heroImg=models.ImageField(upload_to="hero/IMG/",null=True,blank=True)
    location=models.CharField(max_length=15)
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
class IndividualProducerProfile(IndividualProfile):
    """ Profile for individual farmers & buyers """
    farmArea= models.DecimalField( max_digits=5, decimal_places=2,default=0,validators=[MinValueValidator(0),MaxValueValidator(5)])
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
class IndividualBuyerProfile(IndividualProfile):
    """ Profile for individual farmers & buyers """
    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# -----------------------------
# **Farm Model**
# -----------------------------

class FarmProfile(models.Model):
    """ Profile for farms listing produce """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="farm_profile")
    # phone_number = models.CharField(max_length=20, unique=False)
    farmName = models.CharField(max_length=255)
    about=models.CharField(max_length=50)
    tagline=models.CharField(max_length=30)
    farmArea= models.DecimalField(help_text="Size in acres or hectares", null=True, blank=True, max_digits=5, decimal_places=2,default=0,validators=[MinValueValidator(0)])
    rating=models.DecimalField(max_digits=5, decimal_places=0,default=0,validators=[MinValueValidator(0),MaxValueValidator(5)])
    profileImg=models.ImageField(upload_to="profile/IMG/",null=True,blank=True)
    heroImg=models.ImageField(upload_to="hero/IMG/",null=True,blank=True)
    location=models.CharField(max_length=30)
    def __str__(self):
        return self.farmName

# -----------------------------
# **Organization Model**
# -----------------------------


class OrganizationProfile(models.Model):
    """ Profile for organizations like wholesalers, hotels, etc. """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="organization_profile")
    organizationName = models.CharField(max_length=255)
    organizationType = models.CharField(max_length=255, help_text="Wholesaler, Hotel, Retailer, etc.")
    about=models.CharField(max_length=50)
    tagline=models.CharField(max_length=30)
    rating=models.DecimalField(max_digits=5, decimal_places=0,default=0,validators=[MinValueValidator(0),MaxValueValidator(5)])
    profileImg=models.ImageField(upload_to="profile/IMG/",null=True,blank=True)
    heroImg=models.ImageField(upload_to="hero/IMG/",null=True,blank=True)
    location=models.CharField(max_length=15)
    # phone_number = models.CharField(max_length=20, unique=False)

    def __str__(self):
        return self.organization_name
