// routes/index.js
const router = require('express').Router();
const userRoutes = require('./user-routes');
const dasboardRoutes = require('./dashboard-routes')

router.use('/users', userRoutes);
router.use('/dashboard', dasboardRoutes)


module.exports = router;