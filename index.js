const express = require("express");
const mongoose = require("mongoose");

const WorkoutRoutes = require ('./routes/workOut.js');
const userRoutes = require ('./routes/user.js');

const port =4003;
//[SECTION] Environment Setup
const app = express(); 

//[SECTION] Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// [SECTION] Database Setup
mongoose.connect("mongodb+srv://admin:admin@b458.4zn95.mongodb.net/FitnessTrackerApp?retryWrites=true&w=majority&appName=b458");

let db = mongoose.connection;
db.on("error", console.error.bind(console, "Error in the database connection!"));
db.once("open", ()=> console.log("Now connected to MongoDB Atlas."));

app.use("/workOut", WorkoutRoutes);
app.use("/users" , userRoutes);


//[SECTION] Server Gateway Response
if(require.main === module)
{
	app.listen(process.env.PORT || port, ()=> 
	{
		console.log(`API is now running at port ${process.env.PORT || port}`);
	})
}

//This is for the grading.
module.exports = {app, mongoose};