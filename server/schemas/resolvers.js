const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Asset, Portfolio, Stock } = require('../models');
const { DateTimeResolver } = require('graphql-scalars');

const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    users: async () => {
      console.log(User.find());
      return User.find();
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id });
    },
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    assets: async () => {
      return Asset.find();
    },
    portfolios: async () => {
      return await Portfolio.find();
    }
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addPortfolio: async (_, args, context) => {
      const user = await User.findOne({ _id: args.userId });
      const portfolio = await Portfolio.create({ user: user, totalCash: 100000, totalAssetValue: 0 });
      return portfolio;
    },
    //This mutation is used to add an asset to a portfolio
    addAsset: async (_, { userId, name, ticker, quantity, purchasePrice }, context) => {
      //first find the user to get portfolio
      const newAsset = { userId, name, ticker, quantity, purchasePrice };
      const user = await User.findOne({ _id: userId });
      const asset = await Asset.create(newAsset);
      const portfolio = await Portfolio.findOne({ user: user });
      const portfolioTotalCash = portfolio.totalCash;
      const updatedPortfolio = await Portfolio.findOneAndUpdate({ _id: portfolio._id }, { totalCash: (portfolioTotalCash - (quantity * purchasePrice)), totalAssetValue: (quantity * purchasePrice), $push: { assets: asset } });

      return await Portfolio.findOne({ _id: updatedPortfolio._id });
    }
  }
};

module.exports = resolvers;

