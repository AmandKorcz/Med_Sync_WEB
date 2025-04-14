import mysql from 'mysql2/promise';

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'amanda',
    database: 'medsync',
});

export default database;