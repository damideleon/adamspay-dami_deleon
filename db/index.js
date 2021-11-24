const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
    query: async (text, params, callback) => {
      //return pool.query(text, params, callback)
      try {
        const client = await pool.connect();
        return pool.query(text, params, callback);
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    },
     
  }