
// 2. login user
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const users = [
    {
        userId: '12345',
        username: 'aryan',
        password: 'example_password',
        email: 'user@example.com',
    },
];
const mysql = require('mysql');

    // Create a connection pool (recommended for production)
    const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '6201263982',
        database: 'WorkIndiaDB',
    });
    
// Secret key for JWT token generation (you should use a strong secret in production)
const secretKey = '6201263982';
let token;
// Route to handle user login
const login = (req, res) => {
    const { username, password } = req.body;
    // Find the user by username
    pool.getConnection((err, connection) => {
        if (err) {
          console.error('Error connecting to the database:', err);
          return;
        }
      
        console.log('Connected to the database');
        const insert = `Select * from user where username = ? and password = ?`;
        console.log(insert);
      
        connection.query(insert, [username,password],(queryErr, results) => {
          if (queryErr) {
            console.error('Error executing the query:', queryErr);
            connection.release();
            return;
          }
          if(results.length == 0)
          {
            console.log("No user found,Please provide correct credentials");
            res.status(201).json({
              "status": "Incorrect username/password provided. Please retry",
              "status_code": 401
             });
          }
          else{
            const data = JSON.parse(JSON.stringify(results));
            const userid = data[0]['userid'];
            console.log("Login Successfull");
            token = jwt.sign({ userId: userid }, secretKey, {
                        expiresIn: '1h', // Token expiration time
                    });
            console.log(token);
                    // Return a success response with the token
                    res.status(200).json({
                        status: 'Login successful',
                        status_code: 200,
                        user_id: userid,
                        access_token: token,
                    });
          }
          // Release the connection when done
          connection.release();
        });
         
});
    
}
module.exports = {login,token}
