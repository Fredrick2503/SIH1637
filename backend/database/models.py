
from django.db import models
from users.models import User
import uuid




"""
ER Diagram
https://dbdiagram.io/d/67ab41be263d6cf9a0c3a0f6

"""



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


class Produce(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    name = models.CharField(max_length=255)  # Commodity name
    variety = models.CharField(max_length=255, blank=True)  # New Field
    class Meta:
        unique_together = ('name','variety')  # Ensure no duplicate records

    def __str__(self):
        return f"{self.name}-{self.variety}"
    

metrics=(("Kg","Kilogram"),("Q","Qunital"))




# Produce Model (Farmers list items)
class Listings(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="produce_listings")
    produce = models.ForeignKey(Produce, on_delete=models.CASCADE, related_name="market_prices")
    AskPrice=models.DecimalField(max_digits=10,decimal_places=2)

    metrics=models.CharField(max_length=10,choices=metrics,default="Q")
    Qty_available=models.DecimalField(max_digits=10,decimal_places=2)

class ListingImages(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    Image=models.ImageField(upload_to="listings/images")
    _for=models.ForeignKey(Listings,on_delete=models.CASCADE, related_name="listing_images")
    def save(self, *args, **kwargs):
        if self.Image:
            id=uuid.uuid4()
            ext = self.Image.name.split('.')[-1]  # Get file extension
            new_filename = f"{id}.{ext}"  # Create new filename
            self.id=id
            self.Image.name = f"listings/images/{new_filename}"  # Rename the file
        super().save(*args, **kwargs)
    
class Location(models.Model):
    State=models.CharField(max_length=25)
    District=models.CharField(max_length=25)
    Market=models.CharField(max_length=35)

    def __str__(self):
        return str(f"{self.State},{self.District}-{self.Market}")

class MarketPrice(models.Model):
    _id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    produce=models.ForeignKey(Produce,on_delete=models.CASCADE,related_name="market_price")
    location=models.ForeignKey(Location,on_delete=models.CASCADE,related_name="market_location")
    metrics=models.CharField(max_length=10,choices=metrics,default="Q")
    modal_price=models.DecimalField(max_digits=10, decimal_places=2,default=0.0)
    max_price=models.DecimalField(max_digits=10, decimal_places=2,default=0.0)
    min_price=models.DecimalField(max_digits=10, decimal_places=2,default=0.0)

    def __str__(self):
        return str(f"{str(self.produce)}")

    def get_price(self):
        return {"modal_price":self.modal_price,"min_price":self.min_price,"max_price":self.max_price}

# Bids Model (Buyers placing offers)
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

# Orders Model (Finalized Transactions)
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


# Payments Model (Optional)
class Payment(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed')
    ]
    order = models.OneToOneField(Order, on_delete=models.CASCADE, related_name="payment")
    # amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    transaction_id = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)



# # Messages Model (Buyer-Seller Chat)
# class Message(models.Model):
#     sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sent_messages')
#     receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_messages')
#     content = models.TextField()
#     is_read = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)

# # Pricing Analysis Model (Market Price Tracking)
# class PriceAnalysis(models.Model):
#     produce = models.ForeignKey(Produce, on_delete=models.CASCADE, related_name="price_analysis")
#     average_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     highest_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     lowest_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
#     updated_at = models.DateTimeField(auto_now=True)

# Notifications Model (User Alerts)
# class Notification(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
#     message = models.TextField()
#     is_read = models.BooleanField(default=False)
#     created_at = models.DateTimeField(auto_now_add=True)

# Reviews Model (User Feedback)
# class Review(models.Model):
#     reviewer = models.ForeignKey(User, on_delete=models.CASCADE, related_name="given_reviews")
#     seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_reviews")
#     rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
#     comment = models.TextField(blank=True, null=True)
#     created_at = models.DateTimeField(auto_now_add=True)
