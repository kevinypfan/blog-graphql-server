const express = require('express');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./schema/schema');
var bodyParser = require('body-parser')

const { authenticate } = require('./middleware/authenticate');

// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = process.env.MONGODB_URL;

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error));


// app.use(bodyParser.json());

app.use('/graphql', authenticate, expressGraphQL((req, res) => ({
  schema,
  graphiql: true,
  context: { req, res }
})));

module.exports = app;
