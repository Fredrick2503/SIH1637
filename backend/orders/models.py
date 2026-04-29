import uuid
from django.db import models
from users.models import User
from marketplace.models import Listings

class Bid(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected')
    ]
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    listing=models.ForeignKey(Listings,on_delete=models.CASCADE)
    bid_price = models.DecimalField(default=0,max_digits=10, decimal_places=2)
    quantity = models.DecimalField(default=0,max_digits=10, decimal_places=2)
    total_amt=models.DecimalField(default=0,max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ]
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    bid = models.ForeignKey(Bid,on_delete=models.CASCADE)

class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed')
    ]
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
