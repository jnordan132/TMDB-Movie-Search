const { Schema } = require("mongoose");

const movieSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    overview: {
      type: String,
      required: true,
    },
    poster_path: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
    vote_average: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: false,
    },
    id: false,
  }
);

module.exports = movieSchema;
