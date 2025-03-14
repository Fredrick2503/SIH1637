from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.generics import GenericAPIView
from .models import Transaction
from .serializers import TransactionSerializer

class TransactionView(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
    
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
    

class OrderView(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class PaymentView(CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin, GenericAPIView):
    # permission_classes = [IsAuthenticated]
    # authentication_classes = [JWTAuthentication]
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)
    
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)