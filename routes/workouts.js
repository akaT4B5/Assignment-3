const express = require('express');
const router = express.Router();

// Import the controller that handles all the logic
const workoutsController = require('../controllers/workouts');

// --- READ (List) ---
// GET /sessions 
router.get('/', workoutsController.getWorkouts);

// --- CREATE (Add) ---
// GET /sessions/add (Show Form)
router.get('/add', workoutsController.displayAddPage);

// POST /sessions/add (Save Data)
router.post('/add', workoutsController.processAddPage);

// --- UPDATE (Edit) ---
// GET /sessions/edit/:id (Show Form with Data)
router.get('/edit/:id', workoutsController.displayEditPage);

// POST /sessions/edit/:id (Save Updates)
router.post('/edit/:id', workoutsController.processEditPage);

// --- DELETE ---
// GET /sessions/delete/:id
router.get('/delete/:id', workoutsController.deleteSession);

module.exports = router;