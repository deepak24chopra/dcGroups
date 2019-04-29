function getOpenGroups() {
    return fetch(`/api/groups/${user.email}`, {
        method: "get",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        }
    }).then(function(data) {
        if (data.status == 200) {
            return data;
        }
        throw "Get groups Error.";
    }).then(function(data) {
        return data.json();
    });
}

function getOwnGroups() {
    return fetch(`/api/groups/own`, {
        method: "post",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: `{"email" : "${user.email}"}`
    }).then(function(data) {
        if (data.status == 200) {
            return data;
        }
        throw "Get own groups error";
    }).then(function(data) {
        return data.json();
    })
}

function showOpenGroups() {
    document.getElementById("openGroups").innerHTML = "";
    for (var i = 0; i < groups.length; i++) {
        let elem = document.createElement("div");
        elem.innerHTML = `<h4 onclick="javascript: window.location='/#/group/${groups[i]._id}';">${groups[i].name}</h4>`;
        document.getElementById("openGroups").appendChild(elem);
    }
}

function showOwnGroups() {
    document.getElementById("ownGroups").innerHTML = "";
    for (var i = 0; i < ownGroups.length; i++) {
        let elem = document.createElement("div");
        elem.innerHTML = `<h4 onclick="javascript: window.location='/#/group/${ownGroups[i]._id}';">${ownGroups[i].name}</h4>`;
        document.getElementById("ownGroups").appendChild(elem);
    }
}

function createGroup(event) {
    event.preventDefault();
    fetch("/api/groups/create", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{ "email" : "${user.email}", "open" : true, "icon" : "default.png", "name" : "${event.target.name.value}"}`
        }).then(function(data) {
            if (data.status == 404) {
                console.log("API not found");
                return;
            }
            return data;
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            ownGroups.push(data);
            showOwnGroups();
            event.target.name.value = "";
        })
        .catch(function(error) {
            console.log(error);
        });
}

function groupDetail(groupId) {
    fetch("/api/groups/getgroup", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{groupId : "${groupId}"}`
        }).then(function(data) {
            if (data.status == 404) {
                console.log("API not found");
                return;
            }
            return data;
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            group = data;
        })
        .catch(function(error) {
            console.log(error);
        })
}


let group = {};
let groups = [];
let ownGroups = [];