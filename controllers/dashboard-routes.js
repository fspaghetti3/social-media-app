// routes/dashboard-routes.js
const router = require('express').Router()
const { Post, User } = require('../models');
const withAuth = require('../middleware/auth')

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        console.log("Rendering dashboard for:", req.session.username);
        
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
        });

        const posts = postData.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            username: req.session.username,
            loggedIn: req.session.loggedIn,
            sessionUserId: req.session.user_id
        });

    } catch (err) {
        console.error("Error rendering dashboard:", err);
        res.status(500).json(err);
    }
});

module.exports = router;