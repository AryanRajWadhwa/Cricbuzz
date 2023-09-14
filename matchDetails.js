//5 Get Match Details

const mysql = require('mysql');

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '6201263982',
  database: 'WorkIndiaDB',
});

// Route to fetch match details for a specific match by match_id
const matchDetails = (req, res) => {
  const matchId = req.params.match_id;
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return res.status(500).json({ message: 'Database connection error' });
    }

    console.log('Connected to the database');

    // Query to retrieve the number of existing matches
    const sql = `SELECT *  FROM matches`;

    connection.query(sql, (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing the query:', queryErr);
        connection.release();
        return res.status(500).json({ message: 'Database query error' });
      }
      const data = results;

      
          res.status(201).send(
            data
          );
        }
      );
 });
};
module.exports = { matchDetails };

