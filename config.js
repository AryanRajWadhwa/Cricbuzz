const crypto = require('crypto');

// Generate a random 64-character secret key
const secretKey = crypto.randomBytes(32).toString('hex');

const jwtSecretKey = secretKey
module.exports = { jwtSecretKey }