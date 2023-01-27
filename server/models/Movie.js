const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const movieSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
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
