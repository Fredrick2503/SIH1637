from django.shortcuts import render
from database.models import Produce, MarketPrice, Location, Listings
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView, ListCreateAPIView, RetrieveUpdateAPIView, DestroyAPIView
from .serializers import ProduceListSerializer, MarketPriceSerializer, LocationSerializer, ListingsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User

# Create your views here.

class ProduceListView(ListAPIView):
    queryset = Produce.objects.all()
    serializer_class = ProduceListSerializer

class ProduceView(RetrieveAPIView):
    def get_queryset(self):
        _id = self.kwargs.get("pk")
        produce = Produce.objects.filter(id=_id)
        return produce
        
    serializer_class = ProduceListSerializer

class LocationListView(ListAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

class MarketPriceListView(ListAPIView):
    serializer_class = MarketPriceSerializer
    queryset = MarketPrice.objects.all()

class MarketPriceView(RetrieveAPIView):
    def get_queryset(self):
        _id = self.kwargs.get("pk")
        marketprice = MarketPrice.objects.filter(_id=_id)
        return marketprice
        
    serializer_class = MarketPriceSerializer

class SellerListingListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Listings.objects.filter(seller_id=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(seller_id=self.request.user)
        
    serializer_class = ListingsSerializer

class ListingListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Listings.objects.all()
        
    serializer_class = ListingsSerializer

class UserListingView(ListAPIView):
    serializer_class = ListingsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['produce', 'AskPrice', 'Qty_available', 'metrics']
    ordering_fields = ['created_at', 'AskPrice', 'Qty_available']

    def get_queryset(self):
        seller_id = self.kwargs.get("seller_id")
        seller = get_object_or_404(User, id=seller_id)
        return Listings.objects.filter(seller=seller)

class ListingDetailView(RetrieveAPIView):
    queryset = Listings.objects.all()
    serializer_class = ListingsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        listing_id = self.kwargs.get("listing_id")
        return get_object_or_404(Listings, id=listing_id)

class ListingUpdateView(RetrieveUpdateAPIView):
    queryset = Listings.objects.all()
    serializer_class = ListingsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        listing_id = self.kwargs.get("listing_id")
        listing = get_object_or_404(Listings, id=listing_id)

        if self.request.user != listing.seller:
            raise PermissionDenied("You do not have permission to edit this listing.")

        return listing

class ListingDeleteView(DestroyAPIView):
    queryset = Listings.objects.all()
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        listing_id = self.kwargs.get("listing_id")
        listing = get_object_or_404(Listings, id=listing_id)

        if listing.seller != self.request.user:
            raise PermissionDenied("You do not have permission to delete this listing.")

        return listing