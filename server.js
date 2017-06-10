//Config files imports
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/database.config');

//Other imports
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const users = require('./routes/users');
const passport = require('passport');

//Setup Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.localDbUrl);
mongoose.connection.on('connected', () => {
    console.log('Connected to database!');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});


//Setup Passport
app.use(passport.initialize());
app.use(passport.session());
require('./configs/passport.config')(passport);

//Express middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//Express Routes
app.use('/users', users);

// Start Express Server
app.listen(serverConfig.port, () => {
    console.log('Server started at port : ' + serverConfig.port);
});