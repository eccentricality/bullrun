const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User, Asset, Portfolio, Stock, Thought } = require('../models');
const { DateTimeResolver } = require('graphql-scalars');
const googleTrends = require('google-trends-api');
const { externalGetPrice } = require('../utils/updateStocks');

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
    },

    currentStockPrice: async (_, { ticker }) => {
      const data = await externalGetPrice(ticker);
      return [data.ticker, data.results[0].c];

    },
    thoughts: async (parent, args) => {
      return await Thought.find().populate('user');
    },
    thought: async (parent, { thoughtId }) => {
      return await Thought.findOne({ _id: thoughtId });
    },

    googleTrends: async (_, { input }) => {
      try {
        const results = await googleTrends.realTimeTrends(input)
        console.log('These results are awesome', JSON.parse(results).storySummaries.trendingStories);
        return JSON.parse(results).storySummaries.trendingStories;
      } catch (err) {
        console.error('Oh no there was an error', err);
      }
    }
  },
  Mutation: {
    portfolio: async (_, { userId }, context) => {
      const user = await User.findOne({ _id: userId });
      return await Portfolio.findOne({ user: user })
      .populate('assets', [, 'ticker', 'quantity', 'purchasePrice'])
    },

    addUser: async (_, { username, name, email, password }) => {
      const user = await User.create({ username, name, email, password });
      const portfolio = await Portfolio.create({ user: user._id, totalCash: 100000, totalAssetValue: 0 });
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
      const portfolio = await Portfolio.create({ user: user._id, totalCash: 100000, totalAssetValue: 0 });
      return portfolio;
    },
    //This mutation is used to add an asset to a portfolio
    addAsset: async (_, { userId, ticker, quantity, purchasePrice }, context) => {
      //get price of stock
      //first find the user to get portfolio
      const newAsset = { userId, ticker, quantity, purchasePrice };
      const user = await User.findOne({ _id: userId });
      const asset = await Asset.create(newAsset);
      const portfolio = await Portfolio.findOne({ user: user._id });
      const portfolioTotalCash = portfolio.totalCash;
      const portfolioTotalAssets = portfolio.totalAssetValue
      const updatedPortfolio = await Portfolio.findOneAndUpdate(
        {
          _id: portfolio._id
        },
        {
          totalCash: (portfolioTotalCash - (quantity * purchasePrice)),
          totalAssetValue: (portfolioTotalAssets + (quantity * purchasePrice)),
          $push: { assets: asset }
        });


      return await Portfolio.findOne({ _id: updatedPortfolio._id })
        .populate('assets', [, 'ticker', 'quantity', 'purchasePrice']);
    },

    //This mutation is used to sell an asset to a portfolio
    sellAsset: async (_, { userId, assetId, quantity, sellPrice }, context) => {

      //find the sold asset
      const soldAsset = Asset.findOne({ _id: assetId });
      //compare sold qty to asset qty, if it matches, remove asset, else update
      if (quantity === soldAsset.quantity) {
        Asset.findOneAndRemove({ _id: assetId });
      } else {
        Asset.findOneAndUpdate({ _id: assetId }, { quantity: (soldAsset.quantity - quantity) });
      };
      //get user
      const user = await User.findOne({ _id: userId });

      //get user portfolio
      const portfolio = await Portfolio.findOne({ user: user._id });
      //get the total cash and total assets of portfolio currently
      const portfolioTotalCash = portfolio.totalCash;
      const portfolioTotalAssets = portfolio.totalAssetValue

      //update portfolio with increased cash, lower asset value
      const updatedPortfolio = await Portfolio.findOneAndUpdate(
        {
          _id: portfolio._id
        },
        {
          totalCash: (portfolioTotalCash + (quantity * sellPrice)),
          totalAssetValue: (portfolioTotalAssets - (quantity * sellPrice)),
        });


      return await Portfolio.findOne({ _id: updatedPortfolio._id })
        .populate('assets', [, 'ticker', 'quantity', 'purchasePrice']);
    },
    addThought: async (parent, { thoughtText, userId }) => {
      const user = await User.findOne({ _id: userId });
      const thought = await Thought.create({ thoughtText, user });

      //leaving out for now 
      // await User.findOneAndUpdate(
      //   { username: thoughtAuthor },
      //   { $addToSet: { thoughts: thought._id } }
      // );

      return thought;
    },
    addComment: async (parent, { thoughtId, commentText, userId }) => {
      const user = await User.findOne({ _id: userId });
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        {
          $addToSet: { comments: { commentText, user } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
    removeThought: async (parent, { thoughtId }) => {
      return Thought.findOneAndDelete({ _id: thoughtId });
    },
    removeComment: async (parent, { thoughtId, commentId }) => {
      return Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );
    },
  }
};

module.exports = resolvers;

