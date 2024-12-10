const express = require('express');
const workoutController = require('../controllers/workOut.js');

const {verify} = require("../auth.js");
const router = express.Router();



router.post('/', verify, workoutController.addWorkout);
router.get('/', verify, workoutController.getAllWorkouts);
router.get('/:id', verify, workoutController.getWorkoutById);
router.put('/:id', verify, workoutController.updateWorkout);
router.delete('/:id', verify, workoutController.deleteWorkout);

module.exports = router;









