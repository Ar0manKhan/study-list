import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export async function GET(req: Request) {
  // TODO: Check if user is admin
  const migrationClient = postgres(process.env.DATABASE_URL!, { max: 2 });
  migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle/migrations/",
    migrationsTable: "drizzle_migrations",
  });
  return new Response("Migrations done");
}
