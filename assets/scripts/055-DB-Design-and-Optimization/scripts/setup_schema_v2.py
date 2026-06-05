# scripts/setup_schema_v2.py
import psycopg2

conn = psycopg2.connect(
    dbname="tourism", user="postgres", password="postgres", host="localhost", port=5432
)
cur = conn.cursor()

# AI-proposed normalized schema
cur.execute("""
CREATE TABLE IF NOT EXISTS cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS normalized_activity_events (
    id SERIAL PRIMARY KEY,
    activity_name TEXT NOT NULL,
    city_id INT REFERENCES cities(id) ON DELETE CASCADE
);
""")
conn.commit()

print("🏗️ Advanced schema design applied successfully.")
cur.close()
conn.close()
