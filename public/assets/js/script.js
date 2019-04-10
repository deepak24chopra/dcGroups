let router = lsApp.router();

function loadWelcome() {
    localStorage.clear();
    document.getElementById("view").innerHTML = document.getElementById("welcome_template").innerHTML;
}

function loadHome() {

}

router.add("/", loadHome);
router.add("/welcome", loadWelcome);