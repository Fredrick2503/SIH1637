from django.urls import path
from .views import *

urlpatterns = [
    
  
    path("produces/", ProduceListView.as_view(), name="produce-list"),
    path("produces/<str:pk>/", ProduceView.as_view(), name="produce-detail"),

  
    path("marketprices/", MarketPriceListView.as_view(), name="market-price-list"),
    path("marketprices/<str:pk>/", MarketPriceView.as_view(), name="market-price"),

   
    path("locations/", LocationListView.as_view(), name="market-locations"),

 
    path("listings/", ListingListView.as_view(), name="all-listings"),  # All listings
    path("listings/<uuid:listing_id>/", ListingDetailView.as_view(), name="listing-detail"),  # Retrieve individual listing
    path("listings/<uuid:listing_id>/update/", ListingUpdateView.as_view(), name="listing-update"),  # Update a listing
    path("listings/<uuid:listing_id>/delete/", ListingDeleteView.as_view(), name="listing-delete"),  # Delete a listing

  
    path("seller/listings/<str:pk>/",ListingView.as_view(), name="seller-listings"),

   
    path("user/<uuid:seller_id>/listings/", UserListingView.as_view(), name="user-listings"),
]
