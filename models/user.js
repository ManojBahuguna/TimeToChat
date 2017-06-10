const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConfig = require('../configs/database.config');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'First Name is Required!',
        match: /[A-Za-z]+$/
    },
    lastName: {
        type: String,
        required: 'Last Name is Required!',
        match: /[A-Za-z]+$/
    },
    _id: {
        type: String,
        required: 'Email is Required!',
        match: /\S+@\S+\.\S+/,
        unique: true,
    },
    gender: {
        type: String,
        required: 'Gender is Required!',
        enum: {
            values: ['MALE', 'FEMALE', 'OTHER'],
            message: 'Not a valid gender! Gender should be either MALE, FEMALE or OTHER'
        }
    },
    password: {
        type: String,
        required: 'Password is Required!',
    },
    verified: {
        type: Boolean,
        default: false,
    }
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}


module.exports.addUser = function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save();
            callback(null, newUser);
        });
    });
}

module.exports.comparePassword = function(rawPassword, hashPassword, callback) {
    bcrypt.compare(rawPassword, hashPassword, callback);
}