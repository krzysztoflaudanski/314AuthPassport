const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

//Zależnie od rezultatu autoryzacji, nasz serwer 
//będzie od teraz kierował użytkownika do podstrony sukcesu albo porażki.

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
    (req, res) => {
        res.redirect('/user/logged');
    }
);

module.exports = router;