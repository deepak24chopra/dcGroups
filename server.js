const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const path = require('path');

const app = express();

const dbName = 'dc_groups';

const url = "mongodb://localhost:27017";
var db;
mongo.MongoClient.connect(url, { useNewUrlParser: true }, function(err, Client) {
    if (err) {
        console.log(err);
    }
    console.log("Successfully connected to database.");
    db = Client.db(dbName);
});

const users = require('./modules/users.js');
const messages = require('./modules/messages.js');
const groups = require('./modules/groups.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.post("/api/users/signin", users.signin);
app.post("/api/users/signup", users.signup);
app.get("/api/groups/:email", groups.getopengroups);
app.post("/api/groups/own", groups.getowngroups);
app.post("/api/groups/create", groups.create);

app.listen(3000, function() {
    console.log("Server is running at port 3000");
});