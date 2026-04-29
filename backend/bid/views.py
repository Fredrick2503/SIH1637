from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
# Create your views here.
from orders.models import Bid
from .serializers import BidSerializer
from rest_framework.generics import ListAPIView,RetrieveAPIView,ListCreateAPIView
from rest_framework.mixins import ListModelMixin,CreateModelMixin,RetrieveModelMixin,UpdateModelMixin,DestroyModelMixin
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
class BidListView(ListAPIView):
    permission_classes=[AllowAny]
    def get_queryset(self):
        return Bid.objects.all()
    
    serializer_class=BidSerializer
class BidView(ListModelMixin,CreateModelMixin,RetrieveModelMixin,UpdateModelMixin,GenericAPIView,DestroyModelMixin):
    permission_classes=[IsAuthenticated]
    authentication_classes=[JWTAuthentication]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == "producer":
            return Bid.objects.filter(listing__seller=user).order_by('-created_at')
        return Bid.objects.filter(buyer=user).order_by('-created_at')
    
    serializer_class=BidSerializer
    # def list(self, request, *args, **kwargs):
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
    

class BidRetriveView(RetrieveAPIView):
    permission_classes=[AllowAny]
    def get_queryset(self):
        _id=self.kwargs.get("pk")
        bid=Bid.objects.filter(id=_id)
        return bid
    serializer_class=BidSerializer
# /class BidCreateView(ListCreateAPIView):
#     serializer_class=BidSerializer
#     def perform_create(self, serializer):
#         # Assign logged-in user as seller before saving
#         serializer.save(buyer=self.request.user)
# class BidUpdateView(ListCreateAPIView):
#     serializer_class=BidSerializer
#     def perform_create(self, serializer):
#         # Assign logged-in user as seller before saving
#         serializer.save(buyer=self.request.user)
#     def get_queryset(self):
#         return Bid.objects.all()
#     def put(self,request,pk):
#         bid=Bid.objects.get(pk=pk)
#         serializer=BidSerializer(bid,data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse({
#                 "msg":"bid updated successfully"
#             })
#         return JsonResponse({
#             "msg":"error in updating bid"
#         })

# class placebidview():
#     def post(self,request):
#         data=request.data
#         data=Bidserilaizer(data)
#         try:
#             if data.is_valid():
#                 data=data.validate()
#                 bidding=Bid()
#                 bidding.buyer=data['buyer']
#                 bidding.buyer=data['buyer']
#                 bidding.buyer=data['buyer']
#                 bidding.buyer=data['buyer']
#                 bidding.save()
#                 return JsonResponse({
#                     "msg":"bid placed sucesfully"
#                 })
#         except:
#             return JsonResponse({
#                 "msg":" error in placing bid"
#             })
    

