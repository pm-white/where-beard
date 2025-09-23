import express from "express";
import expressAsyncHandler from "express-async-handler";
import db from "./db_connection.js";

const app = express();
const port = 3000;

app.use(express.json());

app.get(
  "/api/",
  expressAsyncHandler(async (req, res) => {
    let d = await db.any(
      "SELECT name, category, year, lat, lon FROM v_semifinalists",
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
