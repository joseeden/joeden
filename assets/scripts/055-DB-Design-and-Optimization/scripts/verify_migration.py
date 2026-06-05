# scripts/verify_migration.py
import psycopg2

conn = psycopg2.connect(
    dbname="tourism", user="postgres", password="postgres", host="localhost", port=5432
)
cur = conn.cursor()

print("--- 1. VERIFYING UNIQUE CITIES ---")
cur.execute("SELECT * FROM cities;")
for city in cur.fetchall():
    print(f"City ID: {city[0]} | Name: {city[1]}")

print("\n--- 2. VERIFYING NORMALIZED ACTIVITIES ---")
cur.execute("SELECT * FROM normalized_activity_events LIMIT 5;")
for act in cur.fetchall():
    print(
        f"Activity ID: {act[0]} | Name: {act[1]} | City ID (Foreign Key): {act[2]}")

print("\n--- 3. VERIFYING RELATIONAL JOIN ---")
join_query = """
    SELECT na.id, na.activity_name, c.name 
    FROM normalized_activity_events na
    JOIN cities c ON na.city_id = c.id
    LIMIT 5;
"""
cur.execute(join_query)
for row in cur.fetchall():
    print(f"ID: {row[0]} | Activity: {row[1]} | City: {row[2]}")

cur.close()
conn.close()
