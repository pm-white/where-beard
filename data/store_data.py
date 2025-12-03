import psycopg
import json

YEAR = 2025

data_file = f"../data/{YEAR}_semifinalists.json"

with open(data_file, "r") as f:
    data = json.load(f)

conn = psycopg.connect("dbname=james_beard user=postgres")
cur = conn.cursor()

categories_seen = set()

counter = 1
for item in data:
    # occasional progress statement
    if counter % 50 == 0:
        print(f"inserting restaurant {counter} / {len(data)}")
    counter += 1

    # restaurants insert
    cur.execute(
        """
        insert into restaurants (name, city, state, lat, lon)
        values (%s, %s, %s, %s, %s) 
        returning restaurant_id
        """,
        (
            item["restaurant"],
            item["city"],
            item["state"],
            item["lat"],
            item["lon"],
        ),
    )
    rest_id = cur.fetchone()[0]

    # categories insert
    if item["category"] not in categories_seen:
        cur.execute(
            """
            insert into categories (category)
            values (%s)
            returning category_id
            """,
            (item["category"],),
        )
        cat_id = cur.fetchone()[0]

        categories_seen.add(item["category"])

    # awards insert
    cur.execute(
        """
        insert into awards (category_id, restaurant_id, year)
        values (%s, %s, %s) 
        """,
        (cat_id, rest_id, item["year"]),
    )

conn.commit()
conn.close()
