import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { Pool } from "pg";

dotenv.config();

async function main() {
	const pool = new Pool({
		connectionString: process.env.DATABASE_URL,
	});

	const db = drizzle(pool);

	console.log("Running migrations...");

	await migrate(db, { migrationsFolder: "./drizzle" });

	console.log("Migrations completed successfully");

	await pool.end();
}

main().catch(err => {
	console.error("Migration failed:", err);
	process.exit(1);
});
