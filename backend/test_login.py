import requests

url = "http://localhost:8000/api/v1/auth/login/"
data = {
    "email": "buyer@demo.com",
    "password": "password123"
}
try:
    res = requests.post(url, json=data)
    print(f"Status: {res.status_code}")
    print(f"Response: {res.text}")
except Exception as e:
    print(f"Error: {e}")
