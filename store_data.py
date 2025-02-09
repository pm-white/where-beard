import psycopg
import json

YEAR = 2025
data_file = f"./data/{YEAR}_semifinalists.json"

with open(data_file, "r") as f:
    data = json.load(f)

conn = psycopg.connect("dbname=james_beard_db user=phil")
cur = conn.cursor()

for item in data:
    cur.execute(
        """
        insert into semifinalists (restaurant, year, category, city, state, person, lat, lon)
        values (%s, %s, %s, %s, %s, %s, %s, %s) 
        """,
        (
            item["restaurant"],
            item["year"],
            item["category"],
            item["city"],
            item["state"],
            item["person"],
            item["lat"],
            item["lon"],
        ),
    )

conn.commit()
conn.close()
