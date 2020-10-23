const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const db = require("./models");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(logger("dev"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
// app.use(require("./routes/api-routes.js"));
// POST /api/workouts
// PUT /api workouts/:id 
// Get /api/workouts/range (last 7 days: think limit (7))

app.post("/api/workouts", (req,res) => {
    db.Workout.create({})
        .then(function(workoutData){
            console.log(workoutData);
            res.json(workoutData);
        })
        .catch(err => {
            res.json(err)
        })
});

app.get("/api/workouts"), (req,res) => {
    db.Workout.find({}).then(function(workoutData){
        res.json(workoutData);
    })
    .catch(err => {
        res.json(err)
    })
}

app.put("/api/workouts/:id", function(req, res) {
    db.Workout.findByIdAndUpdate({
        _id: mongoose.Types.ObjectId(req.params.id)},
        {$push:{exercises:req.body} },
        {new: true,runValidators:true }
    )
    .then(function(workoutData){
        console.log(workoutData);
        res.json(workoutData);
    })
    .catch(err => {
        res.json(err)
    })
});

app.get("/api/workouts/range", (req,res) => {
    db.Workout.find({}).limit(7).then(function(workoutData){
        console.log(workoutData);
        res.json(workoutData);
    })
    .catch(err => {
        res.json(err)
    })
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.listen(PORT, () => {
    console.log (`App is running on http://localhost:${PORT}`);
});