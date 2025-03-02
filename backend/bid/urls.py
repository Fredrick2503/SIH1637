from django.urls import path
from .views import BidView,BidListView,BidRetriveView
urlpatterns = [
    path('',BidListView.as_view(),name="bidlistview"),
    path('<str:pk>',BidRetriveView.as_view(),name="createbid"),
    path('mybid/<str:pk>/',BidView.as_view(),name="bid"),
    path('mybid/',BidView.as_view(),name="bid"),
    # path('bid/<int:pk>/',BidUpdateView.as_view(),name="updatebid"),
]
