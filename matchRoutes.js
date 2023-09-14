const express = require('express');
const router = express.Router();
const { creatematch }= require('../controller/creatematch'); // Import your controller functions
const { matchSchdelue } = require('../controller/matchSchdelue');
const { matchDetails } = require('../controller/matchDetails');
const { addTeamMember } = require('../controller/addTeamMember');
const { playerStatistics } = require('../controller/playerStatistics');


// Define routes for user registration and login
router.post('/matches', creatematch); // Route for user registration
router.get('/matches', matchSchdelue); //Route to get 
router.get('/matches/:match_id',matchDetails);
router.post('/teams/:team_id/squad',addTeamMember);
router.get('/players/:player_id/stats',playerStatistics);

// router.post('/login', login); // Route for user login

module.exports = router;