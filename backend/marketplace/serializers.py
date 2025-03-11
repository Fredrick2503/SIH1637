from rest_framework import serializers
from database.models import Produce,MarketPrice,Location,Listings,ListingImages



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
    
from .utils import send_sse_event

class ListingImageSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model=ListingImages
    #     fields="__all__"
    class Meta:
        model = ListingImages
        fields = ['id', 'Image', '_for']  # ✅ Ensure all necessary fields are included
        extra_kwargs = {"_for": {"required": False}}  # ✅ Don't require _for when uploading images
# class ListingsSerializer(serializers.ModelSerializer):
#     listingImage=ListingImageSerializer()
#     class Meta:
#         model = Listings
#         fields = "__all__"
#     def create(self, validated_data):
#         listing_images_data = self.context['request'].data.get('listing_images', [])  # Get images from request
#         for image_data in listing_images_data:
#             ListingImages.objects.create(_for=listing, Image=image_data)
#         print(validated_data.pop("listingImage"))
#         listing = Listings.objects.create(**validated_data)

class ListingsSerializer(serializers.ModelSerializer):
    listing_images = ListingImageSerializer(many=True, required=False)  # ✅ Allow multiple images

    class Meta:
        model = Listings
        fields = "__all__"

    def create(self, validated_data):
        # ✅ Extract nested images before creating listing
        listing_images_data = validated_data.pop('listing_images', [])
        
        # ✅ Create the Listing instance
        listing = Listings.objects.create(**validated_data)

        # ✅ Create related images
        for image_data in self.context['request'].FILES.getlist('listing_images'):
            ListingImages.objects.create(_for=listing, Image=image_data)

        return listing

    def update(self, instance, validated_data):
        # ✅ Handle updates
        listing_images_data = self.context['request'].FILES.getlist('listing_images')

        # ✅ Update listing fields
        instance.AskPrice = validated_data.get("AskPrice", instance.AskPrice)
        instance.metrics = validated_data.get("metrics", instance.metrics)
        instance.Qty_available = validated_data.get("Qty_available", instance.Qty_available)
        instance.save()

        # ✅ If new images are uploaded, clear old images and add new ones
        if listing_images_data:
            instance.listing_images.all().delete()  # Remove old images
            for image_data in listing_images_data:
                ListingImages.objects.create(_for=instance, Image=image_data)

        return instance

        # Save images separately

        return listing
        
    def to_representation(self, instance):
        data=super().to_representation(instance)
        # send_sse_event({"message": "A new update is available!"})
        data['produce']=str(Produce.objects.get(id=data.get('produce')))
        return data

