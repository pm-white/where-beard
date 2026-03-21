import express from "express";
import expressAsyncHandler from "express-async-handler";
import cors from "cors";
import db from "./db_connection.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "https://james-beard-map.up.railway.app" }));

// returns all restaurants and awards in the db
app.get(
  "/api/points",
  expressAsyncHandler(async (req, res) => {
    let restaurants = await db.any(
      "select restaurant_id, name, lat, lon from restaurants",
    );

    let awards = await db.many(
      `
      select a.restaurant_id, a.year, c.category
      from awards a
      join categories c on c.category_id = a.category_id
      order by a.restaurant_id, a.year, c.category;
      `,
    );

    res.json({ restaurants: restaurants, awards: awards });
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
