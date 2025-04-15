import mysql from 'mysql2/promise';

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'amanda',
    database: 'medsync',
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0,
});

export default database;