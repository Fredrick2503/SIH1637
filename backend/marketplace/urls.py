from django.urls import path
from .views import *

urlpatterns = [
    path("produces/",ProduceListView.as_view(),name="Produce list"),
    path("produces/<str:pk>",ProduceView.as_view(),name="Produce detail"),
    path("Marketprices",MarketPriceListView.as_view(),name="Market price list"),
    path("Marketprices/<str:pk>",MarketPriceView.as_view(),name="Market price"),
    path("locations/",LocationListView.as_view(),name="Market locations"),
    path("Listings/",ListingListView.as_view())
]
