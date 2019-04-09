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


module.exports = {
    signin
}