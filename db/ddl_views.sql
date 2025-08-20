-- view of all semifinalist awards
create or replace view v_semifinalists as
select
	r.name,
	c.category,
	a.year,
	r.city,
	r.state,
	r.lat,
	r.lon
from
	awards a
join 
	restaurants r on r.restaurant_id = a.restaurant_id
join 
	categories c on c.category_id = a.category_id
order by 
	r.name, a.year, c.category;