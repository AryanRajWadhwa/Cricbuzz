const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const verifyToken = require('./middleware/verify')
const matchRoutes = require('./routes/matchRoutes')
const authRoutes = require('./routes/authRoutes')



app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.use('/api/admin', authRoutes)
app.use('/api', matchRoutes)
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
