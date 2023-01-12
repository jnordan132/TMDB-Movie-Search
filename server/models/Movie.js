const mongoose = require("mongoose");

const { Schema } = mongoose;

const movieSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
  },
  release: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
