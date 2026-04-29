from django.urls import path
from .views import TransactionListView, PaymentCreateView

urlpatterns = [
    path('transactions/', TransactionListView.as_view(), name='transaction-list'),
    path('pay/', PaymentCreateView.as_view(), name='payment-create'),
]
