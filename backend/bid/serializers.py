from rest_framework import serializers
from orders.models import Bid
from marketplace.serializers import ListingsSerializer

class BidSerializer(serializers.ModelSerializer):
    produce = serializers.CharField(source='listing.produce.name', read_only=True)
    metrics = serializers.CharField(source='listing.metrics', read_only=True)
    listing_details = ListingsSerializer(source='listing', read_only=True)

    class Meta:
        model = Bid
        fields = "__all__"
        extra_kwargs = {
            "buyer": {"read_only": True},
            "total_amt": {"read_only": True}
        }

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, "user"):
            validated_data["buyer"] = request.user
        
        listing = validated_data.get('listing')
        price = validated_data.get('bid_price', 0)
        qty = validated_data.get('quantity', 0)

        # 1. Enforce bid_price > listing.AskPrice
        if price <= listing.AskPrice:
            raise serializers.ValidationError({"bid_price": f"Bid price must be higher than current asking price (₹{listing.AskPrice})"})

        # 2. Enforce quantity <= listing.Qty_available
        if qty > listing.Qty_available:
            raise serializers.ValidationError({"quantity": f"Requested quantity exceeds available stock ({listing.Qty_available})"})

        # 3. Calculate total amount
        validated_data['total_amt'] = price * qty
        
        # 4. Update listing AskPrice to current max bid price
        listing.AskPrice = price
        listing.save()
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        new_status = validated_data.get('status', instance.status)
        
        # If the bid is being accepted
        if new_status == 'accepted' and instance.status != 'accepted':
            # Reject all other bids for the same listing
            Bid.objects.filter(listing=instance.listing).exclude(id=instance.id).update(status='rejected')
            
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.buyer:
            from users.serializers import ProfileSerializer
            data['buyer_details'] = ProfileSerializer().to_representation(instance.buyer)
        return data