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
    document.getElementById("view").innerHTML = document.getElementById("home_template").innerHTML;
    //get groups
    getOpenGroups()
        .then(function(data) {
            groups = data;
            showOpenGroups();
        })
        .catch(function(error) {
            console.log(error);
        });
    getOwnGroups()
        .then(function(data) {
            ownGroups = data;
            showOwnGroups();
        })
        .catch(function(error) {
            console.log(error);
        });
    //show profile function
    showProfile();
}

function loadGroup(params) {
    if (isSigned() == false) {
        window.location = "/#/welcome";
        return;
    }
    document.getElementById("view").innerHTML = document.getElementById("group_template").innerHTML;
    groupDetail(params.id);
    if (group.members.includes(user.email)) {

    }
    if (!group.members.includes(user.email)) {

    }
}

router.add("/", loadHome);
router.add("/welcome", loadWelcome);
router.add("/group/:id", loadGroup);