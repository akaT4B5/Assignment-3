// Import mongoose to interact with the MongoDB database.
const mongoose = require('mongoose');

// ==============================================================
// SUB-SCHEMA: Individual Exercises
// ==============================================================
// Defines the structure for a single exercise.
// This does not create a separate collection; it is embedded within the Session document.
const exerciseSchema = new mongoose.Schema({
    // Name of the exercise (e.g., "Bench Press").
    name: String,
    
    // restricts the type to strictly 'strength' or 'cardio'.
    // Defaults to 'strength' if not specified.
    type: { 
        type: String, 
        enum: ['strength', 'cardio'], 
        default: 'strength' 
    },
    
    // --- Strength Data Fields ---
    // Fields used if the type is 'strength'.
    reps: Number,
    weight: Number,
    sets: Number,

    // --- Cardio Data Fields ---
    // Fields used if the type is 'cardio'.
    distance: Number, // stored in km
    duration: Number  // stored in minutes
});


// ==============================================================
// MAIN SCHEMA: Workout Session
// ==============================================================
// Defines the main blueprint for the 'sessions' collection in MongoDB.
const sessionSchema = new mongoose.Schema({
    // The date the workout took place.
    date: {
        type: Date,
        default: Date.now, // Defaults to the current timestamp if missing.
        required: true     // This field is mandatory.
    },
    
    // Short description of the session goal (e.g., "Leg Day", "HIIT").
    focus: {
        type: String, 
        required: true
    },
    
    // --- EMBEDDED ARRAY ---
    // Stores a list of exercises directly inside the session document.
    // Uses the structure defined in 'exerciseSchema'.
    exercises: [exerciseSchema] 
});

// ==============================================================
// EXPORT MODEL
// ==============================================================
// Creates the model from the schema and exports it.
// Mongoose automatically creates a 'sessions' collection based on this model.
module.exports = mongoose.model('Session', sessionSchema);