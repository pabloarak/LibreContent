const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const content = require('./routes/content.route');
const app = express();
const dbURL = 'mongodb://database:27017/libre-content';
const port = 3000;

mongoose.connect(dbURL, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/contents', content);

app.set('port', port);

app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});
