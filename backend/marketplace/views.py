from django.shortcuts import render
from database.models import Produce, MarketPrice, Location, Listings, Bid
from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView, RetrieveUpdateAPIView, DestroyAPIView, GenericAPIView
from .serializers import ProduceListSerializer, MarketPriceSerializer, LocationSerializer, ListingsSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
#from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied
from django.contrib.auth.models import User
#from bid.serializers import BidSerializer

# Create your views here.

class ProduceListView(ListAPIView):
    permission_classes=[AllowAny]
    queryset = Produce.objects.all()
    serializer_class = ProduceListSerializer

class ProduceCreateView(CreateAPIView):
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

class LocationCreateView(CreateAPIView):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

class MarketPriceListView(ListAPIView):
    serializer_class = MarketPriceSerializer
    queryset = MarketPrice.objects.all()

class MarketPriceCreateView(CreateAPIView):
    serializer_class = MarketPriceSerializer
    queryset = MarketPrice.objects.all()

class MarketPriceView(RetrieveAPIView):
    def get_queryset(self):
        _id = self.kwargs.get("pk")
        marketprice = MarketPrice.objects.filter(_id=_id)
        return marketprice
        
    serializer_class = MarketPriceSerializer

class ListingListView(ListAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]

    def get_queryset(self):
        return Listings.objects.all()
        
    serializer_class = ListingsSerializer

from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin 
class MyListingView(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin,ListModelMixin, DestroyModelMixin, GenericAPIView):
    permission_classes = [AllowAny]
    authentication_classes = [JWTAuthentication]
    def get_queryset(self):
        return Listings.objects.all()
        # return Listings.objects.filter(seller=self.request.user)
    serializer_class = ListingsSerializer
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    def get(self, request, *args, **kwargs):
        if kwargs.get("pk"):
            return self.retrieve(request, *args, **kwargs)
        return self.list(request, *args, **kwargs)
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


class ListingView(RetrieveAPIView):
    queryset = Listings.objects.all()
    serializer_class = ListingsSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = [JWTAuthentication]

    def get_object(self):
        listing_id = self.kwargs.get("listing_id")
        return get_object_or_404(Listings, id=listing_id)
    

from rest_framework.serializers import Serializer,FileField
class UploadSerializer(Serializer):
    file_uploaded = FileField()
    class Meta:
        fields = ['file_uploaded']

class upload(CreateAPIView):
    serializer_class=UploadSerializer
    permission_classes=[AllowAny]
    def post(self,request):
        file_uploaded = request.FILES.get("img")
        content_type = file_uploaded.content_type
        print(vars(request),file_uploaded,content_type)
        return JsonResponse({})