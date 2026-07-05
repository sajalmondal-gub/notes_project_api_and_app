import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

import db from "../../config/database";

const __filname = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../../../.env") });

async function runSeeders() {
  const databaseModule = await import("../../config/database.js");
  const db = databaseModule.default;
  const client = await db.pool.connect();

  try {
    console.log("⏳ [SEEDER] Seeding dummy data into database...");
    await client.query("BEGIN");

    const seederFolder = __dirname;
    const files = await fs.readdir(seederFolder);

    // শুধু .sql ফাইল ফিল্টার এবং সর্ট করা
    const sqlFiles = files.filter((file) => file.endsWith(".sql")).sort();

    for (const file of sqlFiles) {
      const filePath = path.join(seederFolder, file);
      const sqlQuery = await fs.readFile(filePath, "utf-8");

      console.log(`🌱 [SEEDER] Seeding: ${file}`);
      await client.query(sqlQuery);
    }

    await client.query("COMMIT");
    console.log("✅ [SEEDER SUCCESS] Database seeding completed.\n");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("❌ [SEEDER CRITICAL ERROR] Seeding failed:", error.message);
    process.exit(1);
  } finally {
    client.release();
  }
}

if (process.argv[1] === __filename) {
  runSeeders().then(() => process.exit(0));
}

export default runSeeders;
