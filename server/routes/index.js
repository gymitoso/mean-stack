const express = require('express');

const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');

const router = express.Router();

/** Health check */
router.get('/health', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;
