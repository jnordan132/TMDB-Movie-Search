const { Schema } = require("mongoose");

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const movieSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    posterPath: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    voteAverage: {
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
