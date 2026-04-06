import { Pool } from "pg";

const db = new Pool({
  user: process.env.PG_USER || process.env.DB_USER,
  host: process.env.PG_HOST || process.env.DB_HOST,
  database: process.env.PG_DATABASE || process.env.DB_NAME,
  password: process.env.PG_PASSWORD || process.env.DB_PASSWORD,
  port: Number(process.env.PG_PORT || 5432),
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.error("Database connection error:", err));

export default db;
