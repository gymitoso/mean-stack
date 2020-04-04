// Config should be imported before importing any other file
const config = require('./config/config');
const app = require('./config/express');

require('./config/mongoose');

app.listen(config.port, () => {
  console.info(`Server started on port ${config.port} (${config.env})`);
});

process.on('uncaughtException', (err) => {
  console.error('There was an uncaught error', err);
  process.exit(1);
});

module.exports = app;
