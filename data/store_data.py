import psycopg


def store_data(data: list) -> int:
    conn = psycopg.connect("dbname=james_beard user=postgres")
    cur = conn.cursor()

    cur.execute("select category from categories")
    categories_seen = cur.fetchall()
    categories_seen = set([item[0] for item in categories_seen])

    counter = 1
    for item in data:
        # occasional progress statement
        if counter % 50 == 0:
            print(f"Inserting restaurant {counter} / {len(data)}")
        counter += 1

        # check if restaurant is in the db
        cur.execute(
            """
            select
                restaurant_id
            from
                restaurants
            where
                name = %s and
                city = %s and
                state = %s
            """,
            (
                item["restaurant"],
                item["city"],
                item["state"],
            ),
        )
        result = cur.fetchone()
        if not result:
            # add new restaurant
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
                    round(item["lat"], 4),
                    round(item["lon"], 4),
                ),
            )
            rest_id = cur.fetchone()[0]
        else:
            rest_id = result[0]

        # categories insert
        if item["category"] not in categories_seen:
            cur.execute(
                """
                insert into categories (category, year_added)
                values (%s, %s)
                returning category_id
                """,
                (item["category"], item["year"]),
            )
            categories_seen.add(item["category"])
        else:
            cur.execute(
                "select category_id from categories where category = %s",
                (item["category"],),
            )
        cat_id = cur.fetchone()[0]

        # awards insert
        cur.execute(
            """
            insert into awards (category_id, restaurant_id, year)
            values (%s, %s, %s)
            """,
            (cat_id, rest_id, item["year"]),
        )

    year = data[0]["year"]
    cur.execute("select count(*) from v_semifinalists where year = %s", (year,))
    num_inserts = cur.fetchone()[0]

    conn.commit()
    conn.close()

    return num_inserts
