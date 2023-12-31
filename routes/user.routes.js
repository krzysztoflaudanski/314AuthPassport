const express = require('express');
const router = express.Router();

//Middleware sprawdzający, czy użytkownik jest zalogowany
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/no-permission');
}

router.get('/user/logged', ensureAuthenticated, (req, res, next) => {
    res.render('logged', { displayName: req.user.displayName, picture: req.user._json.picture });
});

router.get('/user/no-permission', (req, res) => {
    res.render('noPermission');
});

// Trasy dostępne tylko dla zalogowanych użytkowników
router.get('/user/profile/', ensureAuthenticated, (req, res) => {
    res.render('profile', { user: req.user });
});

router.get('/user/profile/settings', ensureAuthenticated, (req, res) => {
    res.render('settings', { user: req.user });
});

// Dodaj trasę do sprawdzenia stanu sesji
router.get('/session-info', (req, res) => {
    res.json({ session: req.session, user: req.user });
});

router.get('/auth/logout', (req, res) => {
    req.logout(); // Passport umożliwia łatwe wylogowanie z sesji
    req.session.destroy();
    res.redirect('/'); // Przekieruj użytkownika na stronę główną po wylogowaniu
});

module.exports = router;