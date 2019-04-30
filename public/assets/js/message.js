function getMessages(groupId) {
    messages = [];
    fetch(`/api/message/${group._id}`, {
            method: "get",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            }
        }).then(function(data) {
            if (data.status == 404) {
                console.log("Api not found");
                return;
            }
            return data;
        }).then(function(data) {
            return data.json();
        }).then(function(data) {
            messages = data;
        })
        .catch(function(error) {
            console.log(error);
        })
}

let messages = [];