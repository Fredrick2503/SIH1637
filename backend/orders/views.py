from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import Payment, Order, Bid
from .serializers import PaymentSerializer
import uuid

class TransactionListView(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    serializer_class = PaymentSerializer

    def get_queryset(self):
        user = self.request.user
        if user.user_type == "producer":
            return Payment.objects.filter(order__bid__listing__seller=user).order_by('-created_at')
        return Payment.objects.filter(order__bid__buyer=user).order_by('-created_at')

class PaymentCreateView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        bid_id = request.data.get('bid_id')
        if not bid_id:
            return Response({"error": "bid_id is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            bid = Bid.objects.get(id=bid_id)
        except Bid.DoesNotExist:
            return Response({"error": "Bid not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Security check: only the buyer can pay
        if bid.buyer != request.user:
            return Response({"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
        
        if bid.status == 'completed':
            return Response({"message": "Payment already completed"}, status=status.HTTP_200_OK)

        # Create Order if not exists
        order, created = Order.objects.get_or_create(bid=bid)
        
        # Create Payment (or get existing one)
        payment, p_created = Payment.objects.get_or_create(
            order=order,
            defaults={
                'status': 'completed',
                'transaction_id': f"TR-{uuid.uuid4().hex[:12].upper()}"
            }
        )
        
        # Ensure status is completed if we retrieved an old one
        if not p_created and payment.status != 'completed':
            payment.status = 'completed'
            payment.save()

        # Update Bid status
        bid.status = 'completed'
        bid.save()
        
        return Response({
            "message": "Payment successful",
            "transaction_id": payment.transaction_id,
            "amount": bid.total_amt
        }, status=status.HTTP_201_CREATED)
