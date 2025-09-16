CREATE TABLE IF NOT EXISTS restaurants (
	restaurant_id serial NOT NULL PRIMARY KEY, 
    name varchar(255) NOT NULL,
    city varchar(255),
    state varchar(255),
    lat real,
    lon real
);

CREATE TABLE IF NOT EXISTS categories (
	category_id serial NOT NULL PRIMARY KEY,
 	category text NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS awards (
    category_id int REFERENCES categories(category_id) ON DELETE CASCADE,
    restaurant_id int REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
    year SMALLINT,
    PRIMARY KEY (category_id, restaurant_id, year)
);
