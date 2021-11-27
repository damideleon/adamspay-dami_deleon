const { Pool } = require('pg');
const pgp = require('pg-promise')
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
      }
    },
    Inserts: (template, data) => {
      if (!(this instanceof Inserts)) {
          return new Inserts(template, data);
      }
      this._rawDBType = true;
      this.formatDBType = function () {
          return data.map(d=>'(' + pgp.as.format(template, d) + ')').join(',');
      };
  }
     
  }