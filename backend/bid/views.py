from django.shortcuts import render
from rest_framework.views import APIView
from django.http import JsonResponse
# Create your views here.
from database.models import Bid


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
    

