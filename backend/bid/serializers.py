from rest_framework import serializers
from database.models import Bid
class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bid
        # fields=['id','listing','bid_price','quantity']    
        fields="__all__"