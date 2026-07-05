import fs from "fs/promises";
import path from "path";
import db from "../../config/database";

async function runSeeders() {
    const client = await db.pool.connect();
    
    try {
        console.log('⏳ [SEEDER] Seeding dummy data into database...');
        await client.query('BEGIN');

        const seederFolder = __dirname;
        const files = await fs.readdir(seederFolder);

        // শুধু .sql ফাইল ফিল্টার এবং সর্ট করা
        const sqlFiles = files
            .filter(file => file.endsWith('.sql'))
            .sort();

        for (const file of sqlFiles) {
            const filePath = path.join(seederFolder, file);
            const sqlQuery = await fs.readFile(filePath, 'utf-8');
            
            console.log(`🌱 [SEEDER] Seeding: ${file}`);
            await client.query(sqlQuery);
        }

        await client.query('COMMIT');
        console.log('✅ [SEEDER SUCCESS] Database seeding completed.\n');
        
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ [SEEDER CRITICAL ERROR] Seeding failed:', error.message);
        process.exit(1);
    } finally {
        client.release();
    }
}

if (require.main === module) {
    require('dotenv').config({ path: path.join(__dirname, '../../.env') });
    runSeeders().then(() => process.exit(0));
}

module.exports = runSeeders;