from rest_framework import serializers
from database.models import Produce,MarketPrice,Location,Listings



class ProduceListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Produce
        fields='__all__'


class MarketPriceSerializer(serializers.ModelSerializer):

    class Meta:
        model = MarketPrice
        fields = '__all__'


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = '__all__'

    def to_representation(self, instance):
        print(instance)
        data= {"data":super().to_representation(instance)}
        return data
    
class UserListingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Listings
        fields = ["AskPrice","produce","metrics","Qty_available"]
    def create(self, validated_data):
        # Automatically assign the authenticated user as the seller
        request = self.context.get('request')
        if request and hasattr(request, "user"):
            validated_data["seller_id"] = request.user
        return super().create(validated_data)
    

class ListingsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Listings
        fields = "__all__"
        
    def to_representation(self, instance):
        data=super().to_representation(instance)
        data['produce']=str(Produce.objects.get(id=data.get('produce')))
        return data
