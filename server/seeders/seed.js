const db = require('../config/connection');
const { User, Portfolio, Asset, Stock } = require('../models');
const userSeeds = require('./userSeeds.json');
const portfolioSeeds = require('./portfolioSeeds.json');
const assetSeeds = require('./assetSeeds.json');
const stockSeeds = require('./stockSeeds.json');

db.once('open', async () => {
  try {
    //await User.deleteMany({});
    //await User.create(userSeeds);
    // await Portfolio.deleteMany({});
    // await Portfolio.create(portfolioSeeds);
    //await Asset.deleteMany({});
    //await Asset.create(assetSeeds);
    await Stock.deleteMany({});
    await Stock.create(stockSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
