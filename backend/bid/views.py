from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
# Create your views here.
from database.models import Bid
from .serializers import BidSerializer
from rest_framework.generics import ListAPIView,RetrieveAPIView,ListCreateAPIView
from rest_framework.mixins import ListModelMixin,CreateModelMixin,RetrieveModelMixin,UpdateModelMixin,DestroyModelMixin
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
class BidListView(ListAPIView):
    def get_queryset(self):
        return Bid.objects.all()
    
    serializer_class=BidSerializer
class BidView(ListModelMixin,CreateModelMixin,RetrieveModelMixin,UpdateModelMixin,GenericAPIView,DestroyModelMixin):
    # permission_classes=[IsAuthenticated]
    # authentication_classes=[JWTAuthentication]

    def get_queryset(self):
        return Bid.objects.filter(buyer=self.request.user)
    
    serializer_class=BidSerializer
    def get(self,request,pk):

        return self.retrieve(request)
    def post(self,request):
        return self.create(request) 
    def put(self,request,pk):
        return self.update(request)
    def delete(self,request,pk):
        return self.destroy(request)
    

# class BidView(RetrieveAPIView):
#     def get_queryset(self):
#         _id=self.kwargs.get("pk")
#         bid=Bid.objects.filter(id=_id)
#         return bid
        
#     serializer_class=BidSerializer
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
    

