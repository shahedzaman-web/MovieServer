const mongoose = require("mongoose");

const MovieListSchema = mongoose.Schema({
  MovieName: {
    type: String,
    required: true,
  },
  Language: {
    type: String,
    required: true,
  },
  ReleaseDate: {
    type: String,
    required: true,
  },

  Budget: {
    type: Number,
    required: true,
  },
  Collection: {
    type: Number,
    required: true,
  },
  MoviePoster: {
    type: String ,
   
  }
});

const MovieList = mongoose.model("movieList", MovieListSchema);

module.exports = { MovieList };