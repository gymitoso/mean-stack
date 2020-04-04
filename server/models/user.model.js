const mongoose = require('mongoose');

const ROLES = [
  'ADMIN',
  'SYSADMIN',
  'TEACHER',
  'STUDENT',
];

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // RFC2822 guide lines
    // eslint-disable-next-line no-useless-escape
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  roles: [{
    type: [String],
    enum: ROLES,
  }],
}, {
  versionKey: false,
});

module.exports = mongoose.model('User', UserSchema);
