const objectId = require("mongodb").ObjectId;

function signin(req, res) {
    req.db.collection('users').findOne({ email: req.body.email, password: req.body.password })
        .then(function(data) {
            if (result == null) {
                res.status(501).send("No results found");
            }
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not Found error");
        });
}

function signup(req, res) {
    let user = { _id: new objectId(), email: req.body.email, name: req.body.name, password: req.body.password, created_at: new Date() };
    //enter validations here
    console.log(user);
    req.db.collection('users').insertOne(user)
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(user);
        }).catch(function(error) {
            res.status(500).send("Not Found");
        });
}

module.exports = {
    signin,
    signup
}