// --- 1. Imports ---
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// 'dotenv' is used to read the .env file and load it into process.env
require('dotenv').config(); 


const workoutsRouter = require('./routes/workouts');


// --- 2. App Setup ---
const app = express();
const port = process.env.PORT || 3000; 

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find our 'views' (EJS files)
// This fixes the "Failed to lookup view" error by being specific about the path
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// These are needed to parse form data (for when we add/edit sessions later)
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

// Now, when you visit localhost:3000/sessions, it uses routes/workouts.js
app.use('/sessions', workoutsRouter);


// --- 5. Start the Server ---
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});