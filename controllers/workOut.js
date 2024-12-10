const Workout = require("../models/Workout.js");
const User = require("../models/User.js");

// Add Workout
module.exports.addWorkout = async (req, res) => {
    try {
        const { name, duration, status } = req.body;
        const userId = req.user.id; // Assume req.user contains authenticated user's info

        let newWorkout = new Workout({
            name,
            duration,
            status,
            userId
        });

        const savedWorkout = await newWorkout.save();
        return res.status(201).send(savedWorkout);
    } catch (error) {
        console.error("Error in saving the workout: ", error);
        return res.status(500).send({ error: 'Failed to save the workout' });
    }
};

// Get All Workouts for a User
module.exports.getAllWorkouts = async (req, res) => 
{
    try 
    {
        const userId = req.user.id; // Assume req.user contains authenticated user's info
        const workouts = await Workout.find({ userId: req.user.id });


        if (workouts.length > 0) {
            return res.status(200).send({ workouts });
        } else {
            return res.status(200).send({ message: 'No workouts found.' });
        }
    } catch (error) {s
        console.error("Error in finding workouts: ", error);
        return res.status(500).send({ error: 'Error finding workouts.' });
    }
};

// Get Workout by ID
module.exports.getWorkoutById = async (req, res) => {
    try {
        const userId = req.user.id; // Assume req.user contains authenticated user's info
        const workout = await Workout.findOne({ userId });

        if (!workout) {
            return res.status(404).send({ error: 'Workout not found' });
        }
        return res.status(200).send({ workout });
    } catch (error) {
        console.error("Error in fetching the workout: ", error);
        return res.status(500).send({ error: 'Failed to fetch workout' });
    }
};

// Update Workout
module.exports.updateWorkout = async (req, res) => {
    try {
        const userId = req.user.id; // Assume req.user contains authenticated user's info
        const workoutUpdates = {
            name: req.body.name,
            duration: req.body.duration,
            status: req.body.status
        };

        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: req.params.id, userId },
            workoutUpdates,
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).send({ error: 'Workout not found' });
        }

        return res.status(200).send({ 
            message: 'Workout updated successfully', 
            updatedWorkout 
        });
    } catch (error) {
        console.error("Error in updating the workout: ", error);
        return res.status(500).send({ error: 'Error in updating the workout.' });
    }
};

// Delete Workout
module.exports.deleteWorkout = async (req, res) => {
    try {
        const userId = req.user.id; // Assume req.user contains authenticated user's info
        const deletedResult = await Workout.deleteOne({ _id: req.params.id, userId });

        if (deletedResult.deletedCount === 0) {
            return res.status(400).send({ error: 'No workout deleted' });
        }

        return res.status(200).send({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error("Error in deleting the workout: ", error);
        return res.status(500).send({ error: 'Error in deleting the workout.' });
    }
};
