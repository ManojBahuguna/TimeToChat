const express = require('express');
const router = express.Router();
const dbConfig = require('../configs/database.config');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        _id: req.body.email,
        gender: req.body.gender,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err) {
            if(err.code === 11000)
                res.json({success: false, msg: 'Email already exists!'});
            else
                res.json({success: false, msg: 'Failed to register user!'});
        }
        else
            res.json({success: true, msg: 'User Registered!'});
    });
});

router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserById(email, (err, user)=>{
        if(err) throw err;
        
        if(!user)
            return res.json({success: false, msg: 'User not found!'});
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if(!isMatch)
                return res.json({success: false, msg: 'Incorrect Password!'});
            
            const token = jwt.sign(user, dbConfig.password, {
                expiresIn: '7d'
            });

            res.json({
                success: true,
                token: 'JWT ' + token,
                user: {
                    email: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                }
            });
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;