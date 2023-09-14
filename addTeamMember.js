//6 Team member
const mysql = require('mysql');

// Create a connection pool (recommended for production)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '6201263982',
  database: 'WorkIndiaDB',
});



// Generate a unique player ID (you should use a database for this in a real application)
let nextPlayerId = 1000;

// // Middleware to check if the user is an admin
// const isAdmin = (req, res, next) => {
//   const isAdmin = req.user && req.user.role === 'admin'; // Assuming user role is stored in the user object
//   if (!isAdmin) {
//     return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
//   }
//   next();
// };

// Route to add a player to a team's squad (admin-only)
const addTeamMember =  (req, res) => {
  const { name, role } = req.body;
  const teamId = req.params.team_id;

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
module.exports = { addTeamMember };