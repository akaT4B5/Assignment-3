const Session = require('../models/workout');

// GET /sessions (List Page)
exports.getWorkouts = async (req, res) => {
  try {
    const sessions = await Session.find({}).sort({ date: -1 }); // Sort by newest date
    res.render('workouts/list', { 
      title: 'My Sessions', 
      sessions: sessions 
    });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

// GET /sessions/add
exports.displayAddPage = (req, res) => {
    res.render('workouts/add', { title: 'Log Session' });
};

// POST /sessions/add (The Complex Logic)
exports.processAddPage = async (req, res) => {
    try {
        const exercises = [];
        
        // Ensure input is treated as array even if only 1 exercise is added
        const names = Array.isArray(req.body.names) ? req.body.names : [req.body.names];
        const types = Array.isArray(req.body.types) ? req.body.types : [req.body.types];
        const sets = Array.isArray(req.body.sets) ? req.body.sets : [req.body.sets];
        const reps = Array.isArray(req.body.reps) ? req.body.reps : [req.body.reps];
        const weights = Array.isArray(req.body.weights) ? req.body.weights : [req.body.weights];
        const distances = Array.isArray(req.body.distances) ? req.body.distances : [req.body.distances];
        const durations = Array.isArray(req.body.durations) ? req.body.durations : [req.body.durations];

        // Loop through the arrays and build exercise objects
        for (let i = 0; i < names.length; i++) {
            if (names[i]) { // Only add if name exists
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