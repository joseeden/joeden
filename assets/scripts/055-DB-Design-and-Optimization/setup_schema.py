# setup_schema.py

import psycopg2

conn = psycopg2.connect(
    dbname="tourism",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)

cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS activity_events (
    id SERIAL PRIMARY KEY,
    activity_name TEXT,
    city TEXT
)
""")

conn.commit()
cur.close()
conn.close()

print("Schema created successfully")
