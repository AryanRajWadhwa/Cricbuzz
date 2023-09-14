//4 Get Match Schdelues

const mysql = require('mysql');

    // Create a connection pool (recommended for production)
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '6201263982',
        database: 'WorkIndiaDB',
    });

// Route to fetch all match schedules for guest users
const matchSchdelue =  (req, res) => {

    pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          return;
        }
      
        console.log('Connected to the database');
        const insert = `Select match_id,team1,team2,date,venue from matches`;
        let data;
        connection.query(insert, [],(queryErr, results) => {
          if (queryErr) {
            console.error('Error executing the query:', queryErr);
            connection.release();
            return;
          }
           data = JSON.stringify(results);
          console.log('Query results:', data);
          const matches = results
          res.status(201).send({
            "matches": matches,}
           );
          // Release the connection when done
          connection.release();
        });
        
        });     
    };

module.exports = {matchSchdelue};