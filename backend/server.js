const express = require("express");
const asyncHandler = require("express-async-handler");

const app = express();
const port = 3000;

const db = require("./db_connection");

app.get(
  "/",
  asyncHandler(async (req, res) => {
    let d = await db.any("SELECT * FROM categories");
    res.send(d);
  }),
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
