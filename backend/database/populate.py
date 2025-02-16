

import pandas as pd
from database.models import Produce  # Replace 'myapp' with your actual Django app name

# Load CSV file
file_path = "/mnt/data/1-13.csv"  # Adjust path if needed
df = pd.read_csv(r"C:\Users\fredr\1-13.csv")

# Extract relevant columns & clean data
df = df[['Commodity', 'Variety']].dropna()  # Remove empty values
df['Commodity'] = df['Commodity'].str.strip()
df['Variety'] = df['Variety'].str.strip()

# Remove duplicates before inserting
df = df.drop_duplicates(subset=['Commodity', 'Variety'])

# Insert into database
produce_objects = [
    Produce(name=row["Commodity"], variety=row["Variety"])
    for _, row in df.iterrows()
]

# Use bulk_create for efficiency
Produce.objects.bulk_create(produce_objects, ignore_conflicts=True)

print("Database successfully populated!")
