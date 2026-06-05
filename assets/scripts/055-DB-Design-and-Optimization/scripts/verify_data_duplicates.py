# scripts/verify_data_duplicates.py
import psycopg2
import sys


def check_for_duplicates():
    # Connected using the exact parameters from setup_schema.py
    conn = psycopg2.connect(
        dbname="tourism",
        user="postgres",
        password="postgres",
        host="localhost",
        port=5432
    )
    cursor = conn.cursor()

    # The AI-generated duplicate detection query
    duplicate_query = """
        SELECT activity_name, city, COUNT(*)
        FROM activity_events
        GROUP BY activity_name, city
        HAVING COUNT(*) > 1;
    """

    cursor.execute(duplicate_query)
    duplicates = cursor.fetchall()

    if duplicates:
        print("❌ DATA QUALITY ALERT: Duplicates detected in activity_events!")
        for row in duplicates:
            print(f" - {row[0]} in {row[1]} appears {row[2]} times")

        # Exit with a failure code to block the pipeline
        sys.exit(1)
    else:
        print("✅ Data validation passed: No duplicates found.")
        sys.exit(0)


if __name__ == "__main__":
    check_for_duplicates()
