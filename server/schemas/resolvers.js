const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    removeUser: async (parent, { userId }) => {
      return User.findOneAndDelete({ _id: userId });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      return { token, user };
    },
    addMovie: async (
      parent,
      { userId, id, overview, poster_path, title, release_date, vote_average }
    ) => {
      const movie = {
        id,
        overview,
        poster_path,
        title,
        release_date,
        vote_average,
      };
      console.log(movie);

      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedMovies: movie },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    addShow: async (
      parent,
      { userId, id, overview, poster_path, name, first_air_date, vote_average }
    ) => {
      const show = {
        id,
        overview,
        poster_path,
        name,
        first_air_date,
        vote_average,
      };
      console.log(show);

      return User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: { savedShows: show },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeMovie: async (parent, { userId, id }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { savedMovies: { id: id } },
        },
        { new: true }
      );
    },
    removeShow: async (parent, { userId, id }) => {
      return User.findOneAndUpdate(
        { _id: userId },
        {
          $pull: { savedShows: { id: id } },
        },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
