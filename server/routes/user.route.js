const express = require('express');
const asyncHandler = require('express-async-handler');
const passport = require('passport');

const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(asyncHandler(userCtrl.create));
router.route('/change-password').post(asyncHandler(userCtrl.changePassword));

module.exports = router;
