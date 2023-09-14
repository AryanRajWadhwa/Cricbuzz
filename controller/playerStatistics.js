//7 Player Statistics
const mysql = require('mysql');

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '6201263982',
  database: 'WorkIndiaDB',
});

// Route to fetch player statistics by player_id
const playerStatistics =  (req, res) => {
  const playerId = req.params.player_id;

  // Find player statistics by player_id
  const stats = playerStats[playerId];

  if (!stats) {
    return res.status(404).json({ message: 'Player statistics not found' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return res.status(500).json({ message: 'Database connection error' });
    }

    console.log('Connected to the database');

    // Query to retrieve the number of existing matches
    const sql = `alter table matches add squad`;

    connection.query(sql, (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing the query:', queryErr);
        connection.release();
        return res.status(500).json({ message: 'Database query error' });
      }
      const data = results;

      
          res.status(201).send({
              "message": "Player added to squad successfully",
              "player_id": player_id
             });
        
 });
});
};

module.exports = { playerStatistics };