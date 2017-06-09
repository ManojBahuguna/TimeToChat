const serverConfig = require('./configs/server.config');

const express = require('express');
const app = express();

app.use(express.static('public'));

app.listen(serverConfig.port, function(){
    console.log('Server started at port : ' + serverConfig.port);
});