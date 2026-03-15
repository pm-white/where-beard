drop table if exists restaurants cascade;
drop table if exists categories cascade;
drop table if exists awards;

CREATE TABLE IF NOT EXISTS restaurants (
    restaurant_id serial NOT NULL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    city varchar(255),
    state varchar(255),
    lat real,
    lon real,
    UNIQUE (name, city, state)
);

CREATE TABLE IF NOT EXISTS categories (
	category_id serial NOT NULL PRIMARY KEY,
 	category text NOT NULL UNIQUE,
 	year_added smallint NOT NULL 
);

CREATE TABLE IF NOT EXISTS awards (
    category_id int REFERENCES categories(category_id) ON DELETE CASCADE,
    restaurant_id int REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    year SMALLINT,
    PRIMARY KEY (category_id, restaurant_id, year)
);

-- view of all semifinalist awards
CREATE OR REPLACE VIEW v_semifinalists AS
SELECT
	r.name,
	c.category,
	a.year,
	r.city,
	r.state,
	r.lat,
	r.lon
FROM
	awards a
JOIN 
	restaurants r ON r.restaurant_id = a.restaurant_id
JOIN 
	categories c ON c.category_id = a.category_id
ORDER BY 
	r.name,
	c.category,
	a.year
;