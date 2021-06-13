
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;
const port = process.env.PORT || 4001;
require("dotenv").config();
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kljii.mongodb.net/movie_list?retryWrites=true&w=majority`;
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected!"))
  .catch((error) => console.log(error));


const { MovieList } = require("./Model/movieList");
app.use(bodyParser.json());

app.delete("/deleteMovie/:id",  (req, res) => {
    var response = {};
    // find the data
    MovieList.findById(req.params.id,function(err,data){
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            // data exists, remove it.
            MovieList.deleteOne({_id : req.params.id},function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error deleting data"};
                } else {
                    response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                }
                res.json(response);
            });
        }
  });
})

app.put("/movieUpdate/:id",(req, res)=>{
    var response = {};
        // first find out record exists or not
        // if it does then update the record
        MovieList.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
      
                if(req.body.MovieName !== undefined) {
                
                    data.MovieName = req.body.MovieName;
                }
                if(req.body.Language !== undefined) {
                   
                    data.Language = req.body.Language;
                }
                if(req.body.ReleaseDate !== undefined) {
                   
                    data.ReleaseDate = req.body.ReleaseDate;
                }
               
                if(req.body.Budget !== undefined) {
                   
                    data.Budget = req.body.Budget;
                }
                if(req.body.Collection !== undefined) {
                   
                    data.Collection = req.body.Collection;
                }
                if(req.body.MoviePoster !== undefined) {
                   
                    data.MoviePoster = req.body.MoviePoster;
                }
                
                // save the data
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
})

app.post("/addMovie", (req, res) => {
  var movieList = new MovieList({
    MovieName: req.body.MovieName,
    Language: req.body.Language,
    ReleaseDate: req.body.ReleaseDate,
    Budget: req.body.Budget,
    Collection: req.body.Collection,
    MoviePoster: req.body.MoviePoster
  }).save((err, response) => {
    if (err) res.status(201).send(err);
    res.status(201).send(response);
  });
});
app.get("/movieList", function (req, res) {
    MovieList.find(function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
      }
    });
  });



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});