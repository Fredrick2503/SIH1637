from django.shortcuts import render
from database.models import Produce,MarketPrice,Location,Listings
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.generics import ListAPIView,RetrieveAPIView,ListCreateAPIView
from .serializers import ProduceListSerializer,MarketPriceSerializer,LocationSerializer,ListingsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
# Create your views here.


class ProduceListView(ListAPIView):
    queryset=Produce.objects.all()
    serializer_class=ProduceListSerializer
        # return JsonResponse()

class ProduceView(RetrieveAPIView):
    def get_queryset(self):
        _id=self.kwargs.get("pk")
        produce=Produce.objects.filter(id=_id)
        return produce
        
    serializer_class=ProduceListSerializer

class LocationListView(ListAPIView):
    # permission_classes=[IsAuthenticatedOrReadOnly,IsAuthenticated]
    # authentication_classes=[JWTAuthentication]
    serializer_class=LocationSerializer
    queryset=Location.objects.all()

    
class MarketPriceListView(ListAPIView):
    # permission_classes=[IsAuthenticatedOrReadOnly,IsAuthenticated]
    # authentication_classes=[JWTAuthentication]
    serializer_class=MarketPriceSerializer
    queryset=MarketPrice.objects.all()

class MarketPriceView(RetrieveAPIView):
    def get_queryset(self):
        _id=self.kwargs.get("pk")
        marketprice=MarketPrice.objects.filter(_id=_id)
        return marketprice
        
    serializer_class=MarketPriceSerializer


class SellerListingListView(ListCreateAPIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    def get_queryset(self):
        print("user",self.request.user)
        return Listings.objects.filter(seller_id=self.request.user)
    
    def perform_create(self, serializer):
        # Assign logged-in user as seller before saving
        serializer.save(seller_id=self.request.user)
    serializer_class=ListingsSerializer

class ListingListView(ListCreateAPIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]
    def get_queryset(self):
        print("user",self.request.user)
        return Listings.objects.all() 
    serializer_class=ListingsSerializer   