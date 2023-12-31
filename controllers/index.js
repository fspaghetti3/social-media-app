// routes/index.js
const router = require('express').Router();
const userRoutes = require('./user-routes');
const dashboardRoutes = require('./dashboard-routes')
const postRoutes = require('./post-routes')
const commentRoutes = require('./comment-routes')
const profileRoutes = require('./profile-routes')


router.use('/users', userRoutes);
router.use('/dashboard', dashboardRoutes)
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)
router.use('/profile', profileRoutes)

module.exports = router;