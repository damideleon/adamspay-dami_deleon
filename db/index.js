const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL ||  "postgres://xwscjsafvnevrn:091de7b88dacaecefc9346f7291ba42e33925f6b77025f195eb737ee83c675d4@ec2-54-144-165-97.compute-1.amazonaws.com:5432/d2hmkr70h36u9m" ,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: async (text, params, callback) => {
    //return pool.query(text, params, callback)
    try {
      return pool.query(text, params, callback);
    } catch (err) {
      console.error(err);
    }
  }
}