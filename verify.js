// Import necessary modules
const jwt = require('jsonwebtoken');
const { jwtSecretKey } = require('./config'); // Import your JWT secret key from configuration

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing.' });
    }
    jwt.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.user = decoded; // Set the decoded user object in the request for later use
        next();
    });
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    const user = req.user; // User object from the token
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. You are not an admin.' });
    }
    next();
};

module.exports = {
    verifyToken,
    isAdmin,
};