
const mongoose = require("mongoose");
const db = require("../models")



module.exports = function(app) {
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

    app.get("/api/workouts", function (req, res) {
        db.Workout.find({}, (err, data) => {
            if (err) {
                console.log(err);
            }
            res.json(data)
        });
    });

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
}
