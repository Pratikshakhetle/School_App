import mysql from 'mysql2/promise';

export async function connect() {
    return await mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root@123',
        database: 'school_db',
    });
}