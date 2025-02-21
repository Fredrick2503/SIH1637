from django.urls import path
from .views import BidView,BidListView
urlpatterns = [
    path('bidlist/',BidListView.as_view(),name="bidlistview"),
    path('bid/<str:pk>/',BidView.as_view(),name="bid"),
    # path('bid/',BidCreateView.as_view(),name="createbid"),
    # path('bid/<int:pk>/',BidUpdateView.as_view(),name="updatebid"),
]
