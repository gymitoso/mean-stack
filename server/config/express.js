const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('../routes');
const passport = require('./passport');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors({
  origin: 'http://localhost:4200',
}));

app.use(passport.initialize());

// API router
app.use('/api/', routes);

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    status: err.status || 500,
  });
  next(err);
});

module.exports = app;
