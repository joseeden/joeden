# query_table.py

import psycopg2


def print_table(headers, rows):
    # calculate column widths
    col_widths = [len(h) for h in headers]

    for row in rows:
        for i, value in enumerate(row):
            col_widths[i] = max(col_widths[i], len(str(value)))

    # separator
    def sep():
        return "+".join("-" * (w + 2) for w in col_widths)

    # row formatter
    def fmt_row(row):
        return "|".join(
            f" {str(val).ljust(col_widths[i])} "
            for i, val in enumerate(row)
        )

    print(sep())
    print(fmt_row(headers))
    print(sep())

    for row in rows:
        print(fmt_row(row))

    print(sep())


def main():
    conn = psycopg2.connect(
        dbname="tourism",
        user="postgres",
        password="postgres",
        host="localhost",  # docker service name
        port=5432
    )

    cur = conn.cursor()

    # change table name if needed
    cur.execute("SELECT * FROM activity_events")

    rows = cur.fetchall()
    headers = [desc[0] for desc in cur.description]

    print("\nACTIVITY EVENTS TABLE\n")
    print_table(headers, rows)

    cur.close()
    conn.close()


if __name__ == "__main__":
    main()
