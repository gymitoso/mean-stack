const express = require('express');
const passport = require('passport');

const authCtrl = require('../controllers/auth.controller');

const router = express.Router();

router.post('/login', passport.authenticate('local', { session: false }), authCtrl.login);
router.get('/me', passport.authenticate('jwt', { session: false }), authCtrl.login);

module.exports = router;
