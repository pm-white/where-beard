import psycopg

conn = psycopg.connect("dbname=james_beard_db user=phil")
cur = conn.cursor()
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
