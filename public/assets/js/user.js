function signIn(event) {
    event.preventDefault();
    fetch("/api/users/signin", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{ "email" : "${event.target.email.value}", "password" : "${event.target.password.value}"}`
        }).then(function(data) {
            if (data.status == 200) {
                return data;
            }
            throw "Error";
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            localStorage.setItem("user", JSON.stringify(data));
            window.location = "/#/";
            return;
        })
        .catch(function(error) {
            console.log(error);
        })
}

function signUp(event) {
    event.preventDefault();
    fetch("/api/users/signup", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: `{"email" : "${event.target.email.value}", "name": "${event.target.name.value}", "password": "${event.target.password.value}"}`
        }).then(function(data) {
            if (data.status == 200) {
                return data;
            }
            throw "Error";
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            localStorage.setItem("user", JSON.stringify(data));
            window.location = "/#/";
            return;
        })
        .catch(function(error) {
            console.log(error);
        })
}

function isSigned() {
    if (localStorage.getItem("user") == null) {
        return false;
    }
    user = JSON.parse(localStorage.getItem("user"));
    return true;
}

function showProfile() {
    document.getElementById("profile").innerHTML = "";
    let el = document.createElement("div");
    el.innerHTML = `<h4>${user.name}</h4><br><h4>${user.email}</h4>`;
    document.getElementById("profile").appendChild(el);
}

let user = {};