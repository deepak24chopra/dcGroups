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