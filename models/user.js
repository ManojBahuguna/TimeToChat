const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dbConfig = require('../configs/database.config');

const userSchema = new mongoose.Schema(dbConfig.userSchema);

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(function(err, result){
                if(err)
                    callback(err, null);
                else
                    callback(null, result)
            });
        });
    });
}

module.exports.comparePassword = function (rawPassword, hashPassword, callback) {
    bcrypt.compare(rawPassword, hashPassword, callback);
}