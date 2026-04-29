import uuid
from django.db import models
from users.models import User

metrics=(("Kg","Kilogram"),("Q","Qunital"))

class Produce(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    name = models.CharField(max_length=255)
    variety = models.CharField(max_length=255, blank=True)
    class Meta:
        unique_together = ('name','variety')

    def __str__(self):
        return f"{self.name}-{self.variety}"

class Listings(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name="produce_listings")
    produce = models.ForeignKey(Produce, on_delete=models.CASCADE, related_name="market_prices")
    AskPrice=models.DecimalField(max_digits=10,decimal_places=2)
    metrics=models.CharField(max_length=10,choices=metrics,default="Q")
    Qty_available=models.DecimalField(max_digits=10,decimal_places=2)
    description=models.TextField(blank=True, null=True)

class ListingImages(models.Model):
    id=models.UUIDField(default=uuid.uuid4,primary_key=True)
    Image=models.ImageField(upload_to="listings/images")
    _for=models.ForeignKey(Listings,on_delete=models.CASCADE, related_name="listing_images")
    def save(self, *args, **kwargs):
        if self.Image:
            id=uuid.uuid4()
            ext = self.Image.name.split('.')[-1]
            new_filename = f"{id}.{ext}"
            self.id=id
            self.Image.name = f"listings/images/{new_filename}"
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
