// routes/dashboard-routes.js
const router = require('express').Router()
const { User } = require('../models')
const withAuth = require('../middleware/auth')

router.get('/dashboard', withAuth, (req, res) => {
    console.log("Rendering dash for:", req.session.username)
    res.render('dashboard', {
        username: req.session.username
    });
});

module.exports = router;