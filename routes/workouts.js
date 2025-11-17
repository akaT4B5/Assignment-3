const express = require('express');
const router = express.Router();

// Import the controller we just created
const workoutsController = require('../controllers/workouts');

// GET /sessions -> Uses the controller to show the list
router.get('/', workoutsController.getWorkouts);

module.exports = router;


// GET /sessions (List page) - already exists
router.get('/', workoutsController.getWorkouts);

// GET /sessions/add (Show the form)
router.get('/add', workoutsController.displayAddPage);

// POST /sessions/add (Save the data)
router.post('/add', workoutsController.processAddPage);

module.exports = router;