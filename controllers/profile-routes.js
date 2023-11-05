// routes/post-routes.js
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../middleware/auth');


router.get('/', withAuth, async (req, res) => {
    try {
        const dbData = await User.findByPk(req.session.user_id, {
            attributes: ['username', 'id', 'email', 'image']
        });
        const user = dbData.get({ plain: true });
        res.render('profile', { user })

    } catch (err) {
        console.error('Error:', err)
        res.render('profile', {user: {}})
    }
});

router.get('/edit', withAuth, async (req, res) => {
    try {
        const dbData = await User.findByPk(req.session.user_id, {
            attributes: ['username', 'id', 'email', 'image']
        });
        const user = dbData.get({ plain: true });
        res.render('edit-profile', { user })

    } catch (err) {
        console.error('Error:', err)
        res.render('edit-profile', {user: {}})
    }
});

module.exports = router;