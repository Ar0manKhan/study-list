import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client, Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

migrate(client, { migrationsFolder: "drizzle" });

const db = drizzle(pool);
export default db;
