import psycopg

conn = psycopg.connect("dbname=james_beard user=postgres")
cur = conn.cursor()

cur.execute("""create table if not exists semifinalists;""")

cur.execute(
    """
    create table semifinalists (
        restaurant text,
        year smallint,
        category text,
        city text,
        state text,
        person text,
        lat real,
        lon real
    );
    """
)

conn.commit()
conn.close()
