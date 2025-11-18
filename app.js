// Imports the Express framework to build the web server.
const express = require('express');
// Imports Mongoose to manage MongoDB interactions.
const mongoose = require('mongoose');
// Imports Path to handle file path directories correctly across OS.
const path = require('path');
// Loads environment variables from the .env file (e.g., DB credentials).
require('dotenv').config(); 

// Imports the router file containing all logic for the Sessions (CRUD).
const workoutsRouter = require('./routes/workouts');

// Initializes the Express application.
const app = express();
// Sets the port to the environment variable or defaults to 3000.
const port = process.env.PORT || 3000; 

// Configures EJS as the view engine for rendering HTML templates.
app.set('view engine', 'ejs');

// Explicitly sets the directory where view files are located.
app.set('views', path.join(__dirname, 'views'));

// Serves static assets (CSS, images, JS) from the 'public' directory.
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded data (form submissions).
app.use(express.urlencoded({ extended: true })); 
// Middleware to parse JSON data.
app.use(express.json());


// Retrieves the MongoDB connection string from environment variables.
const mongoURI = process.env.MONGO_URI;

// Connects to the MongoDB Atlas cluster.
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Renders the Home (Splash) Page.
app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' }); 
});

// Renders the Easy Exercises visual guide page.
app.get('/exercises', (req, res) => {
    res.render('exercises', { title: 'Easy Exercises' });
});

// Renders the Workout Templates page.
app.get('/templates', (req, res) => {
    res.render('templates', { title: 'Workout Templates' });
});

// Mounts the workouts router. All requests starting with /sessions go to workouts.js.
app.use('/sessions', workoutsRouter);


// Starts the server listening on the defined port.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});