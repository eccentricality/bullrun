const db = require('../config/connection');
const { User, Portfolio, Asset } = require('../models');
const userSeeds = require('./userSeeds.json');
const portfolioSeeds = require('./portfolioSeeds.json');
const assetSeeds = require('./assetSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    // await Portfolio.deleteMany({});
    // await Portfolio.create(portfolioSeeds);
    await Asset.deleteMany({});
    await Asset.create(assetSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
