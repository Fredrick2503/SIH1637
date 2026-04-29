import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from users.models import IndividualProducerProfile, IndividualBuyerProfile
from marketplace.models import Produce, Location, Listings, MarketPrice
from orders.models import Bid, Order, Payment

User = get_user_model()

def run():
    print("Flushing database...")
    from django.core.management import call_command
    call_command('flush', '--no-input')

    print("Creating users...")
    farmer = User.objects.create_user(email='farmer@demo.com', password='password123', user_type='producer', user_category='individual')
    buyer = User.objects.create_user(email='buyer@demo.com', password='password123', user_type='buyer', user_category='individual')
    
    print("Creating profiles...")
    IndividualProducerProfile.objects.create(user=farmer, first_name='John', last_name='Farmer', tagline='Fresh Organic', about='Organic farming', location='California', farmArea=10)
    IndividualBuyerProfile.objects.create(user=buyer, first_name='Alice', last_name='Buyer', tagline='Healthy Eating', about='Buying fresh', location='New York')

    print("Creating produce and locations...")
    tomato = Produce.objects.create(name='Tomato', variety='Roma')
    potato = Produce.objects.create(name='Potato', variety='Russet')
    apple = Produce.objects.create(name='Apple', variety='Fuji')

    loc1 = Location.objects.create(State='California', District='Central', Market='Central Market')
    
    MarketPrice.objects.create(produce=tomato, location=loc1, modal_price=45.0, min_price=40.0, max_price=50.0)
    MarketPrice.objects.create(produce=potato, location=loc1, modal_price=20.0, min_price=18.0, max_price=22.0)

    print("Creating listings...")
    listing1 = Listings.objects.create(
        produce=tomato,
        seller=farmer,
        metrics='Kg',
        AskPrice=50.0,
        Qty_available=100
    )
    listing2 = Listings.objects.create(
        produce=potato,
        seller=farmer,
        metrics='Q',
        AskPrice=2000.0,
        Qty_available=50
    )

    print("Creating bids...")
    bid1 = Bid.objects.create(
        buyer=buyer,
        listing=listing1,
        bid_price=48.0,
        quantity=50,
        total_amt=48.0 * 50,
        status='accepted'
    )
    bid2 = Bid.objects.create(
        buyer=buyer,
        listing=listing2,
        bid_price=1800.0,
        quantity=10,
        total_amt=1800.0 * 10,
        status='pending'
    )

    print("Creating orders and payments...")
    order1 = Order.objects.create(
        bid=bid1
    )
    payment1 = Payment.objects.create(
        order=order1,
        status='completed',
        transaction_id='TXN-987654321'
    )

    print("Seed complete! You can log in with farmer@demo.com or buyer@demo.com (password: password123)")

if __name__ == '__main__':
    run()
