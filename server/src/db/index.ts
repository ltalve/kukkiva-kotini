require("dotenv").config();

const { Pool, Client } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
  ssl:
    process.env.NODE_ENV == "development"
      ? false
      : { rejectUnauthorized: false },
});

// Lisää timeout

module.exports = {
  query: async (text: string, params: any) => pool.query(text, params),
};
