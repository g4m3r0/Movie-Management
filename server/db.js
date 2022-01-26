// Read configuration from .env file
require('dotenv').config();

const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.DATABASE_USER || "postgres",
    password: process.env.DATABASE_PASS || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT || 5432,
    database: process.env.DATABASE_NAME || "perntodo"
});

module.exports = pool;