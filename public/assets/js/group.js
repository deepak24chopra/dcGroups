function getGroups() {
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
    })
}

function showGroups() {
    document.getElementById("groups").innerHTML = "";
    for (var i = 0; i < groups.length - 1; i++) {
        let elem = document.createElement("div");
        elem.innerHTML = `<h4 onclick="javascript: window.location='/#/group/${groups[i]._id}';">${groups[i].name}</h4>`;
        document.getElementById("groups").appendChild(elem);
    }
}

let groups = [];