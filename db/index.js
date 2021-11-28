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
      return pool.query(text, params, callback);
    } catch (err) {
      console.error(err);
    }
  },
  shouldAbort : (err) => {
    if (err) {
      console.error('Error in transaction', err.stack)
      pool.query('ROLLBACK', err => {
        if (err) {
          console.error('Error rolling back client', err.stack)
        }
      })
  }},
  prepareStatement: (SQLinsert, rows) => {
    const params = []
    const chunks = []
    rows.forEach(row => {
      const valueClause = []
      row.forEach(p => {
        params.push(p)
        valueClause.push('$' + params.length)
      })
      chunks.push('(' + valueClause.join(', ') + ')')
    })
    return {
      statement: SQLinsert + chunks.join(', '),
      params: params
    }
  }
}