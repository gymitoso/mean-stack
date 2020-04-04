// Load vars in .env in PROCESS.ENV
require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.NODE_ENV === 'development'
      ? 'mongodb://localhost:27018'
      : 'mongodb://mongo-db',

    databaseName: 'mean',

    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: 'migrations',

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'changelog',
};

// Return the config as a promise
module.exports = config;
