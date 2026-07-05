import fs from "fs/promises";
import path from "path";
import db from "../../config/database";

async function runMigrations() {
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

if (require.main === module) {
  require("dotenv").config({ path: path.join(__dirname, "../../.env") });
  runMigrations().then(() => process.exit(0));
}
module.exports = runMigrations;
