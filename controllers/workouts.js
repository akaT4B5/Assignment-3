const Session = require('../models/workout');

// GET /sessions (List Page)
exports.getWorkouts = async (req, res) => {
  try {
    const sessions = await Session.find({}).sort({ date: -1 }); 
    res.render('workouts/list', { 
      title: 'My Sessions', 
      sessions: sessions 
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

// GET /sessions/add (Show Add Form)
exports.displayAddPage = (req, res) => {
    res.render('workouts/add', { title: 'Log Session' });
};

// POST /sessions/add (Save New Session)
exports.processAddPage = async (req, res) => {
    try {
        const exercises = [];
        const names = Array.isArray(req.body.names) ? req.body.names : [req.body.names];
        const types = Array.isArray(req.body.types) ? req.body.types : [req.body.types];
        const sets = Array.isArray(req.body.sets) ? req.body.sets : [req.body.sets];
        const reps = Array.isArray(req.body.reps) ? req.body.reps : [req.body.reps];
        const weights = Array.isArray(req.body.weights) ? req.body.weights : [req.body.weights];
        const distances = Array.isArray(req.body.distances) ? req.body.distances : [req.body.distances];
        const durations = Array.isArray(req.body.durations) ? req.body.durations : [req.body.durations];

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

        const newSession = new Session({
            date: req.body.date,
            focus: req.body.focus,
            exercises: exercises
        });

        await newSession.save();
        res.redirect('/sessions');

    } catch (err) {
        console.error(err);
        res.redirect('/sessions/add');
    }
};

// GET /sessions/delete/:id
exports.deleteSession = async (req, res) => {
    try {
        await Session.findByIdAndDelete(req.params.id);
        res.redirect('/sessions');
    } catch (err) {
        console.log(err);
        res.redirect('/sessions');
    }
};

// --- EDIT FUNCTIONS (These were likely missing or broken) ---

// GET /sessions/edit/:id (Show Edit Form)
exports.displayEditPage = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id);
        res.render('workouts/edit', { 
            title: 'Edit Session', 
            session: session 
        });
    } catch (err) {
        console.log(err);
        res.redirect('/sessions');
    }
};

// POST /sessions/edit/:id (Save Updates)
exports.processEditPage = async (req, res) => {
    try {
        const id = req.params.id;
        
        // Logic to parse the arrays (Same as Add)
        const exercises = [];
        const names = Array.isArray(req.body.names) ? req.body.names : [req.body.names];
        const types = Array.isArray(req.body.types) ? req.body.types : [req.body.types];
        const sets = Array.isArray(req.body.sets) ? req.body.sets : [req.body.sets];
        const reps = Array.isArray(req.body.reps) ? req.body.reps : [req.body.reps];
        const weights = Array.isArray(req.body.weights) ? req.body.weights : [req.body.weights];
        const distances = Array.isArray(req.body.distances) ? req.body.distances : [req.body.distances];
        const durations = Array.isArray(req.body.durations) ? req.body.durations : [req.body.durations];

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

        // Update the existing session
        await Session.findByIdAndUpdate(id, {
            date: req.body.date,
            focus: req.body.focus,
            exercises: exercises
        });

        res.redirect('/sessions');
    } catch (err) {
        console.log(err);
        res.redirect('/sessions');
    }
};