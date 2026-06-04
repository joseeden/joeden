# verify_schema.py

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
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
""")

tables = cur.fetchall()

print("Tables in database:")
for t in tables:
    print("-", t[0])
