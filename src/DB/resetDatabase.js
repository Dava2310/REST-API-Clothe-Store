import { createConnection } from "mysql2/promise";
import fs from 'fs'
import config from '../config.js'

async function resetDatabase() {
    const connection = await createConnection({
        host: config.mysql.host,
        user: config.mysql.user,
        password: config.mysql.password,
    })

    const sql = fs.readFileSync('./src/DB/DB.sql', 'utf-8');
    const queries = sql.split(';').filter(query => query.trim());

    for (const query of queries) {
        await connection.query(query)
    }

    await connection.end();
}

resetDatabase().catch(err => {
    console.error('Error reseting database', err);
    process.exit(1)
})

