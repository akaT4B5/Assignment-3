const express = require('express');
// Initialize the Express Router to handle specific path requests.
const router = express.Router();

// Import the controller that contains the functional logic for these routes.
const workoutsController = require('../controllers/workouts');


// Read operation
// Routes traffic for the main list page to the getWorkouts controller.
// GET /sessions 
router.get('/', workoutsController.getWorkouts);

// Create operation
// Routes requests to display the "Add Session" form.
// GET /sessions/add 
router.get('/add', workoutsController.displayAddPage);

// Routes form submissions to save the new session to the database.
// POST /sessions/add 
router.post('/add', workoutsController.processAddPage);

//Update operation
// Routes requests to display the "Edit Session" form, populated with existing data by ID.
// GET /sessions/edit/:id 
router.get('/edit/:id', workoutsController.displayEditPage);

// Routes form submissions to update the specific session in the database.
// POST /sessions/edit/:id 
router.post('/edit/:id', workoutsController.processEditPage);

//Delete operation
// Routes requests to remove a specific session based on the ID in the URL.
// GET /sessions/delete/:id
router.get('/delete/:id', workoutsController.deleteSession);

// Exports the configured router for use in the main application (app.js).
module.exports = router;