// routes/user-routes.js
const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const withAuth = require('../middleware/auth');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            // req.session.username = userData.username;
            req.session.loggedIn = true;

            res.status(200).json(userData);
        });
    } catch (err) {
            console.error("Error in login route:", err)
            res.status(400).json(err);
    } 
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });
        console.log("User data from DB:", userData ? userData.get() : "No user found.")
        if (!userData) {
            console.log("User not found in database:", req.body.username)
            res.status(400).json({ message: 'Incorrect username or password' });
            return;
        }

        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        console.log("Is password valid?", validPassword)
        if (!validPassword) {
            console.log("Incorrect password for:", req.body.username)
            res.status(400).json({ message: 'Incorrect username or password' });
            return;
        }


            res.redirect('/dashboard');
       
    } catch (error) {

    }
// }
    // console.log("User", req.body.username, "is attempting to log in.")
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.use((req, res, next) => {
    console.log("Incoming request to:", req.path);
    console.log("Session data:", req.session);
    next();
});

router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.loggedIn = true;
            console.log("Logged in as:", req.session.username)
            res.render('signup', { success: true });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/dashboard', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/users/login');
        return;
    }

    console.log(`User ${req.session.username} is logged in.`)

    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: ['id', 'username'] 
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            username: user.username
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {
        console.log("Logging out:", req.session.username)
        req.session.destroy(() => {
            res.redirect('/users/login')
        });
    } else {
        console.log("No session to log out from.")
        res.status(404).end();
    }
});

module.exports = router;