//Config files imports
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/database.config');

//Other imports
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

//Setup Mongoose
mongoose.connect(dbConfig.localDbUrl);
mongoose.connection.on('connected', () => {
    console.log('Connected to database!');
});
mongoose.connection.on('error', (err) => {
    console.log(err);
});


//Express middlewares
app.use(express.static(path.join(__dirname, 'public')));


// Start Express Server
app.listen(serverConfig.port, ()=>{
    console.log('Server started at port : ' + serverConfig.port);
});