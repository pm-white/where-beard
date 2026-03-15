import express from "express";
import expressAsyncHandler from "express-async-handler";
import cors from "cors";
import db from "./db_connection.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "https://james-beard-map.up.railway.app" }));

// returns all points in the db
app.get(
  "/api/points",
  expressAsyncHandler(async (req, res) => {
    let d = await db.any("select restaurant_id, lat, lon from restaurants");
    res.json(d);
  }),
);

// get the awards for a selected restaurant
app.get(
  "/api/awards/:restaurant_id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.restaurant_id;
    let d = await db.any(
      `
      select a.year, c.category
      from awards a
      join categories c on c.category_id = a.category_id
      where a.restaurant_id = $1
      order by year, category
      `,
      [id],
    );
    res.json(d);
  }),
);

// get the name of the selected restaurant
app.get(
  "/api/name/:restaurant_id",
  expressAsyncHandler(async (req, res) => {
    const id = req.params.restaurant_id;
    let d = await db.one(
      "select name from restaurants where restaurant_id = $1",
      [id],
    );
    res.json(d);
  }),
);

// all points for selected categories
app.get(
  "/api/points/categories/:category",
  expressAsyncHandler(async (req, res) => {
    const category = req.params.category;
    let d = await db.any(
      `
      select distinct r.restaurant_id, r.lat, r.lon
      from restaurants r
      join awards a on a.restaurant_id = r.restaurant_id
      join categories c on c.category_id = a.category_id
      where c.category in ($1:list)
      `,
      [category.split("|")],
    );
    res.json(d);
  }),
);

// all points for selected years
app.get(
  "/api/points/years/:year",
  expressAsyncHandler(async (req, res) => {
    const year = req.params.year;
    let d = await db.any(
      `
      select distinct r.restaurant_id, r.lat, r.lon
      from restaurants r
      join awards a on a.restaurant_id = r.restaurant_id
      where a.year in ($1:list)
      `,
      [year.split(",")],
    );
    res.json(d);
  }),
);

// all points for selected years and categories
app.get(
  "/api/points/:year/:category",
  expressAsyncHandler(async (req, res) => {
    const year = req.params.year;
    const category = req.params.category;
    let d = await db.any(
      `
      select distinct r.restaurant_id, r.lat, r.lon
      from restaurants r
      join awards a on a.restaurant_id = r.restaurant_id
      join categories c on c.category_id = a.category_id
      where
        a.year in ($1:list) and
        c.category in ($2:list)
      `,
      [year.split(","), category.split("|")],
    );
    res.json(d);
  }),
);

// returns a list of categories from the db
app.get(
  "/api/categories",
  expressAsyncHandler(async (req, res) => {
    const d = await db.any("SELECT category FROM categories");
    const cats = d.map((row) => row.category);
    res.json(cats);
  }),
);

// returns a list of years from the db
app.get(
  "/api/years",
  expressAsyncHandler(async (req, res) => {
    const d = await db.any("SELECT distinct year FROM awards");
    const years = d.map((row) => row.year);
    res.json(years);
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
