from django.contrib import admin
from .models import Produce, MarketPrice, Location, Listings, ListingImages
# Register your models here.


admin.site.register(MarketPrice)
admin.site.register(Location)
admin.site.register(Listings)
# admin.site.register(MarketPrice)