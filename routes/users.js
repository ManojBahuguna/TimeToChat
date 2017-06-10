const express = require('express');
const router = express.Router();
const dbConfig = require('../configs/database.config');
const User = require('../models/user');

router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        _id: req.body.email,
        gender: req.body.gender,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        console.log(err);
        if(err)
            res.json({success: false, msg: 'Failed to register user!'});
        else
            res.json({success: true, msg: 'User Registered!'});
    });
});

module.exports = router;