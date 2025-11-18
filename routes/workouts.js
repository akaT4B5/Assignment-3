const express = require('express');
const router = express.Router();

// Import the controller that handles all the logic
const workoutsController = require('../controllers/workouts');

// GET /sessions 
// Shows the list of all workout sessions
router.get('/', workoutsController.getWorkouts);

// GET /sessions/add 
// Displays the "Add Session" form
router.get('/add', workoutsController.displayAddPage);

// POST /sessions/add 
// Handles the form submission and saves the new session to MongoDB
router.post('/add', workoutsController.processAddPage);

// GET /sessions/delete/:id
// Deletes a specific session based on its ID
router.get('/delete/:id', workoutsController.deleteSession);


// ... existing routes ...

// GET /sessions/edit/:id (Show the form with data)
router.get('/edit/:id', workoutsController.displayEditPage);

// POST /sessions/edit/:id (Save the updates)
router.post('/edit/:id', workoutsController.processEditPage);

module.exports = router;