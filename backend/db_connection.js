// database connection
import pgPromise from "pg-promise";

const pgp = pgPromise();

let db;
if (process.env.NODE_ENV === "production") {
  db = pgp(
    `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=require`,
  );
} else {
  db = pgp(
    `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  );
}

export default db;
