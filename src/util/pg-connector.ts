import { Pool } from 'pg';
import 'dotenv/config';

const db = new Pool({
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.INVENTORY_URL,
    port: 5432,
});

export async function closePool() {
    await db.end();
}

export default db;
