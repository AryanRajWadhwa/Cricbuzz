// 1. register a user

const mysql = require('mysql');
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '6201263982',
        database: 'WorkIndiaDB',
    });

const users = []
// Generate a unique user ID 
function generateUserId() {
  return (Math.random() * 1000000).toFixed(0);
}

const signup = (req, res) => {
        // Import the mysql library
        const userId = generateUserId();
        const { username,password,email} = req.body

    // Basic input validation
    if (!username || !password || !email) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

      pool.getConnection((err, connection) => {
          if (err) {
            console.error('Error connecting to the database:', err);
            return;
          }
        
          console.log('Connected to the database');
          const sql = `Select * from user where username = ?`;
        
          connection.query(sql, [username],(queryErr, results) => {
            if (queryErr) {
              console.error('Error executing the query:', queryErr);
              connection.release();
              return;
            }
            if(results.length != 0)
            {
              console.log("User already present")
              res.send({
                  status:"user already present",
              });
            }
            else{
              const insert = `Insert into user(userid,username,password,email) values (?,?,?,?);`;
        
          connection.query(insert, [userId,username,password,email],(queryErr, results) => {
            if (queryErr) {
              console.error('Error executing the query:', queryErr);
              connection.release();
              return;
            }
        
            console.log('Query results:', results);
            
            // Release the connection when done
            connection.release();
          });
          res.status(200).json({
          status: 'Admin Account successfully created',
          status_code: 200,
          user_id: userId,
      });
            }
          });
            
          
          
      });
}
module.exports = {signup}

