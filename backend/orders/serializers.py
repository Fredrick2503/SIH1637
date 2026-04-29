from rest_framework import serializers
from .models import Payment

class PaymentSerializer(serializers.ModelSerializer):
    amount = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = ['transaction_id', 'amount', 'created_at', 'status']

    def get_amount(self, obj):
        try:
            return obj.order.bid.total_amt
        except Exception:
            return 0
