const mysql = require('mysql');

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '6201263982',
  database: 'WorkIndiaDB',
});

// Route to add a new match (admin-only)
const creatematch = async (req, res) => {
  const { team1, team2, date, venue } = req.body;
  if (!team1 || !team2 || !date || !venue) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return res.status(500).json({ message: 'Database connection error' });
    }

    console.log('Connected to the database');

    // Query to retrieve the number of existing matches
    const sql = `SELECT COUNT(*) AS matchCount FROM matches`;

    connection.query(sql, (queryErr, results) => {
      if (queryErr) {
        console.error('Error executing the query:', queryErr);
        connection.release();
        return res.status(500).json({ message: 'Database query error' });
      }

      const matchCount = results[0].matchCount;
      const match_id = (matchCount + 1).toString();

      const insert = `INSERT INTO matches (match_id, team1, team2, date, venue, status, squad) VALUES (?, ?, ?, ?, ?, ?, ?)`;

      const squad = `{ 
        team1: [
          {
            player_id: '123',
            name: 'Virat Kohli',
            matches_played: 200,
            runs: 12000,
            average: 59.8,
            strike_rate: 92.5,
            wickets: 0,
          },
          {
            player_id: '456',
            name: 'Jasprit Bumrah',
            matches_played: 200,
            runs: 12000,
            average: 59.8,
            strike_rate: 92.5,
            wickets: 0,
          },
        ],
        team2: [
          {
            player_id: '789',
            name: 'Steve Smith',
            matches_played: 200,
            runs: 12000,
            average: 59.8,
            strike_rate: 92.5,
            wickets: 0,
          },
          {
            player_id: '101',
            name: 'Mitchell Starc',
            matches_played: 200,
            runs: 12000,
            average: 59.8,
            strike_rate: 92.5,
            wickets: 0,
          },
        ],
      }`;
      const status = 'upcoming';

      connection.query(
        insert,
        [match_id, team1, team2, date, venue, status, squad],
        (queryErr, insertResults) => {
          if (queryErr) {
            console.error('Error executing the query:', queryErr);
            connection.release();
            return res.status(500).json({ message: 'Database insert error' });
          }

          console.log('Query results:', insertResults);

          // Release the connection when done
          connection.release();

          res.status(201).send({
            message: 'Match created successfully',
            match_id: match_id,
          });
        }
      );
    });
  });
};

module.exports = { creatematch };
