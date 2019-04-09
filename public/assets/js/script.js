let router = lsApp.router();

function loadWelcome() {
    localStorage.clear();
    document.getElementById("view").innerHTML = document.getElementById("welcome_template").innerHTML;
}


router.add("/welcome", loadWelcome);