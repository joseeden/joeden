# scripts/migrate_to_v2.py
import psycopg2
import sys


def migrate_data():
    try:
        # Connect to the tourism database
        conn = psycopg2.connect(
            dbname="tourism",
            user="postgres",
            password="postgres",
            host="localhost",
            port=5432
        )
        cur = conn.cursor()

        print("Checking for existing data to migrate...")
        cur.execute("SELECT COUNT(*) FROM activity_events;")
        row_count = cur.fetchone()[0]

        if row_count == 0:
            print(
                "No data found in the original activity_events table. Migration skipped.")
            cur.close()
            conn.close()
            return

        print(f"Found {row_count} records to normalize. Running migration...")

        # Step 1: Extract unique cities and insert them into the new cities table
        cur.execute("""
            INSERT INTO cities (name)
            SELECT DISTINCT city FROM activity_events
            ON CONFLICT (name) DO NOTHING;
        """)

        # Step 2: Map old activities to new schema using the generated city IDs
        cur.execute("""
            INSERT INTO normalized_activity_events (activity_name, city_id)
            SELECT ae.activity_name, c.id
            FROM activity_events ae
            JOIN cities c ON ae.city = c.name;
        """)

        # Commit the transaction to save changes
        conn.commit()

        print("✅ Data migration completed successfully.")
        print("   - Unique cities extracted and saved.")
        print("   - Activity records successfully normalized and linked.")

    except psycopg2.Error as e:
        print(f"❌ Migration failed due to database error: {e}")
        sys.exit(1)
    finally:
        if 'cur' in locals():
            cur.close()
        if 'conn' in locals():
            conn.close()


if __name__ == "__main__":
    migrate_data()
