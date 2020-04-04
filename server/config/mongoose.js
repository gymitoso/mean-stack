const mongoose = require('mongoose');

const config = require('./config');

// Connect to mongo db
const mongoUri = config.mongo.host;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  poolSize: 10,
  keepAlive: 300,
});

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${mongoUri}`);
});
