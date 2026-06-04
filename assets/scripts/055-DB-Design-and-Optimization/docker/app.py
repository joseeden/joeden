# app.py

import time
import psycopg2
from psycopg2 import OperationalError, errors

DB_CONFIG = {
    "dbname": "tourism",
    "user": "postgres",
    "password": "postgres",
    "host": "postgres_db",
    "port": 5432
}


def get_connection(max_retries=10, delay=2):
    for attempt in range(max_retries):
        try:
            print(f"Connecting to Postgres... attempt {attempt + 1}")
            conn = psycopg2.connect(**DB_CONFIG)
            print("Database connection established")
            return conn

        except OperationalError as e:
            print(f"DB not ready yet: {e}")
            time.sleep(delay)

    raise Exception("Could not connect to Postgres after retries")


def main():
    conn = get_connection()
    cur = conn.cursor()

    try:
        cur.execute("SELECT * FROM activities_event")
        rows = cur.fetchall()

        print("Data:")
        for row in rows:
            print(row)

    except errors.UndefinedTable as e:
        print("\nSCHEMA ERROR DETECTED")
        print("Table does not exist in current database schema.")
        print(f"Details: {e}")

    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()
