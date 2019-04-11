let router = lsApp.router();

function loadWelcome() {
    localStorage.clear();
    document.getElementById("view").innerHTML = document.getElementById("welcome_template").innerHTML;
}

function loadHome() {
    if (isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    getGroups()
        .then(function(data) {
            groups = data;
            showGroups();
        })
        .catch(function(error) {
            console.log(error);
        });
    document.getElementById("view").innerHTML = document.getElementById("home_template").innerHTML;
}

function loadGroup(params) {
    if (isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    console.log(params.id);
    document.getElementById("view").innerHTML = document.getElementById("group_template").innerHTML;
}

router.add("/", loadHome);
router.add("/welcome", loadWelcome);
router.add("/group/:id", loadGroup);