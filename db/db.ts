import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// import { migrate } from "drizzle-orm/postgres-js/migrator";
// const migrationClient = postgres(process.env.DATABASE_URL!, { max: 2 });
// migrate(drizzle(migrationClient), {
//   migrationsFolder: "./drizzle/migrations/",
//   migrationsTable: "drizzle_migrations",
// });
//
const queryClient = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryClient);
export default db;
