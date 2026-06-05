# scripts/optimize_performance.py
import psycopg2

conn = psycopg2.connect(
    dbname="tourism",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)
cur = conn.cursor()

print("--- [BEFORE INDEXING] ---")
cur.execute(
    "EXPLAIN ANALYZE SELECT city, COUNT(*) FROM activity_events GROUP BY city;")
for line in cur.fetchall():
    print(line[0])

print("\nApplying optimization...")
cur.execute(
    "CREATE INDEX IF NOT EXISTS idx_activity_events_city ON activity_events(city);")
# Update statistics so Postgres recognizes the new index structure
cur.execute("ANALYZE activity_events;")
conn.commit()
print("Index 'idx_activity_events_city' created successfully.\n")

print("--- [AFTER INDEXING (FORCED PLAN FOR DEMO)] ---")
# Force Postgres to simulate a large table environment by disabling sequential scans
cur.execute("SET enable_seqscan = off;")
cur.execute(
    "EXPLAIN ANALYZE SELECT city, COUNT(*) FROM activity_events GROUP BY city;")
for line in cur.fetchall():
    print(line[0])

cur.close()
conn.close()
