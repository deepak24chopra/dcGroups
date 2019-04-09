"use-strict";

(function($) {
    let r;
    // Router class
    class RouterClass {
        constructor() {
            this.routes = [];
            this.params = {};
            this.found = false;
        }

        // Init function on events
        init(e) {
            e.preventDefault();
            r.params = {};
            r.found = false;
            let url = $.location.hash.split("/");
            if (url[1] == undefined) {
                url = ["#", ""];
            }
            for (let i = 0; i < r.routes.length; i++) {
                let rurl = r.routes[i].r.split("/");
                if (rurl.length == url.length) {
                    // If url length matches routes length
                    for (let j = 1; j < url.length; j++) {
                        if (rurl[j] != url[j] && rurl[j][0] != ":") {
                            r.found = false;
                            break;
                        }
                        if (rurl[j][0] == ":") {
                            if (rurl[j].length == 1) {
                                // Checks if parameter have length 
                                console.error(`SyntaxError: Invalid parameter in url after ${rurl[j-1]}/: !`);
                                return;
                            }
                            r.params[rurl[j].substring(1)] = url[j];
                        }
                        r.found = true;
                    }
                    if (r.found) {
                        r.routes[i].c(r.params);
                        break;
                    }
                }
            }
        }

        // Add route to router
        add(route, callback) {
            let newRoute = { r: route, c: callback };
            this.routes.push(newRoute);
        }
    }

    // Exported router function
    function router() {
        r = new RouterClass();
        // Route hash events
        $.addEventListener("load", r.init, false);
        $.addEventListener("popstate", r.init, false);
        return r;
    }

    // lsApp library object
    $.lsApp = {
        router: router
    };
}(window));