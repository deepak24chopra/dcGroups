const objectId = require('mongodb').ObjectId;

function getopengroups(req, res) {
    let email = req.params.email;
    req.db.collection('groups').find({
            open: true,
            members: { $ne: [email] }
        }).toArray()
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not found");
        });
}

function create(req, res) {
    let newGroup = { _id: new objectId(), admins: [req.body.email], members: [req.body.email], name: req.body.name, open: req.body.open, icon: req.body.icon, created_at: new Date() };
    req.db.collection('groups').insertOne(newGroup)
        .then(function(result) {
            if (result == null) {
                res.send(501).send("No result");
            }
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not Found");
        });
}

function getowngroups(req, res) {
    let email = req.body.email;
    req.db.collection('groups').find({
            members: [email]
        }).toArray()
        .then(function(result) {
            if (result == null) {
                res.status(501).send("No result");
            }
            res.status(200).send(result);
        }).catch(function(error) {
            res.status(500).send("Not found");
        });
}

module.exports = {
    getopengroups,
    create,
    getowngroups
}