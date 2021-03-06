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

    googleTrends: async (_, args) => {
      console.log("ARGS", args)
      try {
        const results = await googleTrends.realTimeTrends(args.input);
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
      const latestValue = parseFloat(quantity) * parseFloat(purchasePrice);
      const newAsset = { userId, ticker, quantity, purchasePrice, latestValue };
      const user = await User.findOne({ _id: userId });
      const asset = await Asset.create(newAsset);
      console.log(newAsset);
      console.log(asset);
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
        .populate('assets', [, 'ticker', 'quantity', 'purchasePrice', 'latestValue']);
    },

    //This mutation is used to sell an asset to a portfolio
     sellAsset: async (_, { userId, assetId, quantity, sellPrice }, context) => {

      quantity = parseFloat(quantity);
      sellPrice = parseFloat(sellPrice);
      //find the sold asset
      const soldAsset = await Asset.findOne({ _id: assetId });
      console.log(soldAsset);
      const stock = await Stock.findOne({ ticker: soldAsset.ticker });

      if (quantity === soldAsset.quantity) {
        await Asset.findOneAndRemove({ _id: assetId });
      } else {
        await Asset.findOneAndUpdate({ _id: assetId },
          {
            quantity: (soldAsset.quantity - quantity),
            latestValue: ((soldAsset.quantity - quantity) * stock.previousClosingPrice)
          });
      };

      const user = await User.findOne({ _id: userId });

      const portfolio = await Portfolio.findOne({ user })
        .populate('assets', ['ticker', 'quantity', 'purchasePrice', 'latestValue']);

      const portfolioAssets = portfolio.assets;

      let totalAssetValue = 0;
      if (portfolioAssets.length) {
        for (let i = 0; i < portfolioAssets.length; i++) {
          let value = parseFloat(portfolioAssets[0].latestValue)
          totalAssetValue = totalAssetValue + value;
        };
      };
      let totalCash = portfolio.totalCash + (quantity * sellPrice);
      console.log(typeof totalAssetValue);
      return await Portfolio.findOneAndUpdate(
        {
          _id: portfolio._id
        },
        {
          totalCash,
          totalAssetValue,
        }).populate('assets', [, 'ticker', 'quantity', 'purchasePrice', 'latestValue']);
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

