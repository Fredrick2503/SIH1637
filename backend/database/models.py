
from django.db import models
from users.models import User



"""
ER Diagram
https://dbdiagram.io/d/67ab41be263d6cf9a0c3a0f6

"""


# # User Model (Farmers & Buyers)
# class User(models.Model):
#     USER_TYPES = [
#         ('buyer', 'Buyer'),
#         ('seller', 'Seller')
#     ]
#     user_type = models.CharField(max_length=10, choices=USER_TYPES)
#     phone_number = models.CharField(max_length=20, unique=True)

# Produce Model (Farmers list items)
class Produce(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="produce_listings")
    name = models.CharField(max_length=255)  # Commodity name
    variety = models.CharField(max_length=255, blank=True)  # New Field
    grade = models.CharField(max_length=50, blank=True)  # New Field
    market = models.CharField(max_length=255, blank=True)  # New Field
    state = models.CharField(max_length=100, blank=True)  # New Field
    district = models.CharField(max_length=100, blank=True)  # New Field
    description = models.TextField(blank=True)
    quantity = models.FloatField()
    unit = models.CharField(max_length=20, choices=[('kg', 'Kilogram'), ('ton', 'Ton'), ('box', 'Box')])
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

# Bids Model (Buyers placing offers)
class Bid(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected')
    ]
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bids")
    produce = models.ForeignKey(Produce, on_delete=models.CASCADE, related_name="bids")
    bid_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.FloatField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

# Orders Model (Finalized Transactions)
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled')
    ]
    bid = models.OneToOneField(Bid, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="seller_orders")
    buyer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="buyer_orders")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

# Messages Model (Buyer-Seller Chat)
class Message(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

# Pricing Analysis Model (Market Price Tracking)
class PriceAnalysis(models.Model):
    produce = models.ForeignKey(Produce, on_delete=models.CASCADE, related_name="price_analysis")
    average_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    highest_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    lowest_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

# Notifications Model (User Alerts)
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

# Reviews Model (User Feedback)
class Review(models.Model):
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="given_reviews")
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_reviews")
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

# Payments Model (Optional)
class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed')
    ]
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class MarketPrice(models.Model):
        produce = models.ForeignKey(Produce, on_delete=models.CASCADE, related_name="market_prices")
        market = models.CharField(max_length=255)  # Market Name
        state = models.CharField(max_length=100)  
        district = models.CharField(max_length=100)
        arrival_date = models.DateField()  # Date when price was recorded
        min_price = models.DecimalField(max_digits=10, decimal_places=2)  
        max_price = models.DecimalField(max_digits=10, decimal_places=2)  
        modal_price = models.DecimalField(max_digits=10, decimal_places=2)  # Most common price

        class Meta:
            unique_together = ('produce', 'market', 'arrival_date')  # Ensure no duplicate records


