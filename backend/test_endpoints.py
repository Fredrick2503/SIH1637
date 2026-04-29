import requests
import yaml

def run_tests():
    with open('schema.yaml', 'r') as f:
        schema = yaml.safe_load(f)

    base_url = 'http://localhost:8000'
    endpoints = schema.get('paths', {})
    
    results = []
    for path, methods in endpoints.items():
        if 'get' in methods:
            # Replace path parameters with dummies
            test_path = path.replace('{id}', '1').replace('{pk}', '1').replace('{listing_id}', '00000000-0000-0000-0000-000000000000').replace('{uidb64}', 'dummy').replace('{token}', 'dummy')
            url = f"{base_url}{test_path}"
            
            try:
                # Add dummy token to bypass 401s if possible, or just expect 401/403 instead of 500
                res = requests.get(url, headers={'Authorization': 'Bearer dummy'})
                results.append(f"{path}: {res.status_code}")
                if res.status_code >= 500:
                    print(f"ERROR 500 on {url}: {res.text[:200]}")
            except Exception as e:
                print(f"Failed to connect to {url}: {e}")
                
    for r in results:
        print(r)

if __name__ == '__main__':
    run_tests()
