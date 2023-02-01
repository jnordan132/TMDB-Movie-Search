const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const movieSchema = new Schema(
  {
    id: {
      type: Number,
      // required: true,
    },
    overview: {
      type: String,
      // required: true,
    },
    poster_path: {
      type: String,
    },
    title: {
      type: String,
      // required: true,
    },
    release_date: {
      type: String,
      // required: true,
    },
    vote_average: {
      type: Number,
      // required: true,
    },
  },
  {
    toJSON: {
      virtuals: false,
    },
    id: false,
  }
);

const showSchema = new Schema(
  {
    id: {
      type: Number,
      // required: true,
    },
    overview: {
      type: String,
      // required: true,
    },
    poster_path: {
      type: String,
    },
    name: {
      type: String,
      // required: true,
    },
    first_air_date: {
      type: String,
      // required: true,
    },
    vote_average: {
      type: Number,
      // required: true,
    },
  },
  {
    toJSON: {
      virtuals: false,
    },
    id: false,
  }
);

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    savedMovies: [movieSchema],
    savedShows: [showSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.virtual("movieCount").get(function () {
  return this.savedMovies.length;
});

const User = model("User", userSchema);

module.exports = User;
