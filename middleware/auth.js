// middleware/auth.js
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        console.log("Auth'd session not found.")
        res.redirect('/users/login');
    } else {
        console.log("Auth'd session for:", req.session.username)
        next();
    }
};

module.exports = withAuth;