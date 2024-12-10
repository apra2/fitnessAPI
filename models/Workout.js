const mongoose = require ('mongoose');
const workoutSchema =  new mongoose.Schema({

    name :
    {
        type :String,
        required: [true, 'name is required']
    },
    duration: 
    { 
        type: String, 
        required: [true, 'Duration is required'] 
    },
    dateAdded: 
    { 
        type: Date, 
        default: Date.now 
    },
    status: 
    { 
        type: String, 
        enum: ['completed', 'pending'],
         required: [true, 'Status is required'] 
}
});

module.exports = mongoose.model('Workout', workoutSchema);