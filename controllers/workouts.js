// I'm importing the 'Session' model here. This allows me to connect to my MongoDB database.
// I'll use this variable whenever I need to Find, Save, Update, or Delete data.
const Session = require('../models/workout');


// This is the controller function I wrote to handle the main sessions list page.
exports.getWorkouts = async (req, res) => {
  try {
    // 1. I'm asking the database to find all sessions.
    //    .find({}) means "give me everything" because the curly braces are empty.
    //    .sort({ date: -1 }) sorts them so the newest dates show up first.
    //    I use 'await' to pause the code right here until the database finishes searching.
    const sessions = await Session.find({}).sort({ date: -1 }); 
    
    // 2. If that works, I render the 'list.ejs' page found in my views folder.
    //    I'm passing an object with the title and the actual sessions data I just found.
    res.render('workouts/list', { 
      title: 'My Sessions', 
      sessions: sessions 
    });
  } catch (err) {
    // 3. If something goes wrong (like the DB is offline), I log the error so I can see it.
    console.log(err);
    //    Then I redirect back to the home page so the user isn't stuck on a broken screen.
    res.redirect('/');
  }
};
// This simple controller just shows the "Add Session" form.
// GET /sessions/add
exports.displayAddPage = (req, res) => {
    res.render('workouts/add', { title: 'Log Session' });
};

// It processes the form when I click "Save".
// POST /sessions/add
exports.processAddPage = async (req, res) => {
    try {
        // I'll start with an empty array to hold the exercise objects I'm about to build.
        const exercises = [];
        

        // The form sends data as arrays (like names[], reps[]). If I only add ONE exercise, the form sends a single string instead of an array.
        // These lines force the data to ALWAYS be an array, even if it's just one item.
        // This prevents my loop from crashing later.
        const names = Array.isArray(req.body.names) ? req.body.names : [req.body.names];
        const types = Array.isArray(req.body.types) ? req.body.types : [req.body.types];
        const sets = Array.isArray(req.body.sets) ? req.body.sets : [req.body.sets];
        const reps = Array.isArray(req.body.reps) ? req.body.reps : [req.body.reps];
        const weights = Array.isArray(req.body.weights) ? req.body.weights : [req.body.weights];
        const distances = Array.isArray(req.body.distances) ? req.body.distances : [req.body.distances];
        const durations = Array.isArray(req.body.durations) ? req.body.durations : [req.body.durations];

        // Program loops through those arrays to build nice, clean objects for each exercise.
        for (let i = 0; i < names.length; i++) {
            // Check if a name actually exists before adding it (skips blank rows).
            if (names[i]) { 
                exercises.push({
                    name: names[i],       // e.g., "Bench Press"
                    type: types[i],       // e.g., "strength" or "cardio"
                    sets: sets[i],        // Strength stuff
                    reps: reps[i],
                    weight: weights[i],
                    distance: distances[i], // Cardio stuff
                    duration: durations[i]
                });
            }
        }

        // Now I create a new Mongoose Document using the Session model.
        // Add date and focus from the form, and the exercise array.
        const newSession = new Session({
            date: req.body.date,
            focus: req.body.focus,
            exercises: exercises
        });

        // Save this new document to the database.
        // Use 'await' to make sure it's fully saved.
        await newSession.save();
        
        // Once it's saved, send the user back to the list page to see their new entry.
        res.redirect('/sessions');

    } catch (err) {
        // If something fails (like validation), log it and reload the form.
        console.error(err);
        res.redirect('/sessions/add');
    }
};


// This controller handles deleting a specific session.
// GET /sessions/delete/:id
exports.deleteSession = async (req, res) => {
    try {
        // Obtain the ID from the URL (req.params.id) and tell the database to delete that specific document.
        await Session.findByIdAndDelete(req.params.id);
        
        // Refresh the list page so the deleted item disappears.
        res.redirect('/sessions');
    } catch (err) {
        console.log(err);
        res.redirect('/sessions');
    }
};

// This shows the Edit form, but it pre-fills it with the existing data.
// GET /sessions/edit/:id
exports.displayEditPage = async (req, res) => {
    try {
        // Find the specific session by its ID.
        const session = await Session.findById(req.params.id);
        
        // Render the 'edit.ejs' page and pass that session data to it.
        res.render('workouts/edit', { 
            title: 'Edit Session', 
            session: session 
        });
    } catch (err) {
        console.log(err);
        res.redirect('/sessions');
    }
};

// This saves the changes made in the Edit form.
// POST /sessions/edit/:id
exports.processEditPage = async (req, res) => {
    try {
        // Obtain the ID of the session attempting to update.
        const id = req.params.id;
        
        // --- DATA PRE-PROCESSING ---
        // Just like the "Add" page, it has to rebuild the exercise array from the form data.
        // Repetitive, but necessary to handle the dynamic rows correctly.
        const exercises = [];
        const names = Array.isArray(req.body.names) ? req.body.names : [req.body.names];
        const types = Array.isArray(req.body.types) ? req.body.types : [req.body.types];
        const sets = Array.isArray(req.body.sets) ? req.body.sets : [req.body.sets];
        const reps = Array.isArray(req.body.reps) ? req.body.reps : [req.body.reps];
        const weights = Array.isArray(req.body.weights) ? req.body.weights : [req.body.weights];
        const distances = Array.isArray(req.body.distances) ? req.body.distances : [req.body.distances];
        const durations = Array.isArray(req.body.durations) ? req.body.durations : [req.body.durations];

        // Loop through and reconstruct the exercise objects.
        for (let i = 0; i < names.length; i++) {
            if (names[i]) {
                exercises.push({
                    name: names[i],
                    type: types[i],
                    sets: sets[i],
                    reps: reps[i],
                    weight: weights[i],
                    distance: distances[i],
                    duration: durations[i]
                });
            }
        }

        // Find the document by ID and Update it with the new object.
        // The first argument is the ID to find.
        // The second argument is the new data that overwrites the old stuff.
        await Session.findByIdAndUpdate(id, {
            date: req.body.date,
            focus: req.body.focus,
            exercises: exercises
        });

        // Back to the main list to see the changes.
        res.redirect('/sessions');
    } catch (err) {
        console.log(err);
        res.redirect('/sessions');
    }
};