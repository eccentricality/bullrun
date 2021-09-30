const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
// const { makeExecutableSchema } = require('@graphql-tools/schema')
// const { DateTimeResolver, DateTimeTypeDefinition } = require('graphql-scalars');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

const { updateStocks } = require('./utils/updateStocks');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

//run  every 24 hours
setInterval(function () {
  updateStocks();
}, 120000);