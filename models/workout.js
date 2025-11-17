const mongoose = require('mongoose');

// Define a sub-schema for individual exercises
// This won't get its own collection; it lives inside the Session
const exerciseSchema = new mongoose.Schema({
    name: String,
    type: { type: String, enum: ['strength', 'cardio'], default: 'strength' },
    
    // Strength fields
    reps: Number,
    weight: Number,
    sets: Number,

    // Cardio fields
    distance: Number, // e.g., in km or miles
    duration: Number  // e.g., in minutes
});

// Define the main Session schema
const sessionSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    focus: {
        type: String, // e.g., "Leg Day", "HIIT", "Recovery"
        required: true
    },
    // This is the array that holds all the exercises for this session
    exercises: [exerciseSchema] 
});

module.exports = mongoose.model('Session', sessionSchema);