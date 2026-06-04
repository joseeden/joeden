# verify_data.py

import psycopg2

conn = psycopg2.connect(
    dbname="tourism",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)

cur = conn.cursor()

cur.execute("SELECT COUNT(*) FROM activity_events")
count = cur.fetchone()[0]

print("Row count:", count)
