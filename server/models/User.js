const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const movieSchema = new Schema(
  {
    id: {
      type: Number,
    },
    overview: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    title: {
      type: String,
    },
    release_date: {
      type: String,
    },
    vote_average: {
      type: Number,
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
    },
    overview: {
      type: String,
    },
    poster_path: {
      type: String,
    },
    name: {
      type: String,
    },
    first_air_date: {
      type: String,
    },
    vote_average: {
      type: Number,
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
