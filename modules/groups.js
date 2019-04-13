function getgroups(req, res) {
    let email = req.params.email;
    req.db.collection('groups').find({
            open: true,
            email: { $ne: email }
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
    getgroups
}