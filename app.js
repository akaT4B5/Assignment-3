// --- 1. Imports ---
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// Load environment variables from .env file
require('dotenv').config(); 

// Import the router for the sessions (CRUD) logic
const workoutsRouter = require('./routes/workouts');

// --- 2. App Setup ---
const app = express();
const port = process.env.PORT || 3000; 

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find our 'views' (EJS files)
app.set('views', path.join(__dirname, 'views'));

// Tell Express to serve static files (CSS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// These are needed to parse form data (req.body)
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


// --- 4. Routes ---


app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' }); 
});

// Easy Exercises Page
app.get('/exercises', (req, res) => {
    res.render('exercises', { title: 'Easy Exercises' });
});

// Workout Templates Page (The New Route)
app.get('/templates', (req, res) => {
    res.render('templates', { title: 'Workout Templates' });
});

// Sessions (CRUD) Routes
// Connects the /sessions URL to our workouts router file
app.use('/sessions', workoutsRouter);


// --- 5. Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});