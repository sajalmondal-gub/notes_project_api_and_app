import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../../.env") });

async function runMigrations() {
  // 👈 ৩. ডাইনামিক ইম্পোর্ট: .env লোড হওয়ার পর ডাটাবেজ ফাইল রিড করা হচ্ছে
  const databaseModule = await import("../../config/database.js");
  const db = databaseModule.default;

  const client = await db.pool.connect();
  try {
    console.log(
      "\n⏳ [MIGRATION] Initializing enterprise database migration...",
    );
    await client.query("BEGIN");

    const migrationFolder = __dirname;
    const files = await fs.readdir(migrationFolder);
    const sqlFiles = files.filter((file) => file.endsWith(".sql")).sort();

    for (const file of sqlFiles) {
      const filePath = path.join(migrationFolder, file);
      const sqlQuery = await fs.readFile(filePath, "utf-8");

      console.log(`⚙️  [MIGRATION] Executing: ${file}`);
      await client.query(sqlQuery);
    }

    await client.query("COMMIT");
    console.log(
      "✅ [MIGRATION SUCCESS] All structural files migrated without errors.\n",
    );
  } catch (error) {
    await client.query("ROLLBACK");
    console.error(
      "❌ [MIGRATION CRITICAL ERROR] Sequence broke down:",
      error.message,
    );
    process.exit(1);
  } finally {
    client.release();
  }
}

if (process.argv[1] === __filename) {
  runMigrations().then(() => process.exit(0));
}

export default runMigrations;