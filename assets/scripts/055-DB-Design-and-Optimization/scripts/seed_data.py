# seed_data.py

import psycopg2

conn = psycopg2.connect(
    dbname="tourism",
    user="postgres",
    password="postgres",
    host="localhost",
    port=5432
)

cur = conn.cursor()

data = [
    ("City Tour", "Singapore"),
    ("Museum Visit", "Singapore"),
    ("Marina Bay Walk", "Singapore"),
    ("Night Safari", "Singapore"),
    ("Food Tour", "Singapore"),

    ("Eiffel Tower Visit", "Paris"),
    ("Louvre Museum Tour", "Paris"),
    ("Seine River Cruise", "Paris"),
    ("Montmartre Walk", "Paris"),
    ("Paris Food Tasting", "Paris"),

    ("Statue of Liberty Tour", "New York"),
    ("Central Park Walk", "New York"),
    ("Met Museum Visit", "New York"),
    ("Brooklyn Bridge Walk", "New York"),
    ("Times Square Night Tour", "New York"),

    ("Colosseum Tour", "Rome"),
    ("Vatican Museum Visit", "Rome"),
    ("Trevi Fountain Stop", "Rome"),
    ("Roman Food Tour", "Rome"),
    ("Ancient Ruins Walk", "Rome")
]

cur.executemany("""
INSERT INTO activity_events (activity_name, city)
VALUES (%s, %s)
""", data)

conn.commit()
cur.close()
conn.close()

print("20+ seed records inserted")
