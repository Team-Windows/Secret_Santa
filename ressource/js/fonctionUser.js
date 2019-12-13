$(document).ready(function () {
    getUsers();

    $("#add-user-button").click(function (event) {
        addUser();
    });
});

function urlParam(name) {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

function getUsers() {
    let group = urlParam('group');
    $.ajax({
        method: "GET",
        url: "http://localhost:2000/users",
        format: "json",
        success: function (users) {
            $('#users').text('');
            for (let c = 0; c < users.length; c++) {
                if (users[c].affected_group === group) {
                    $("#users").append("<li class='user' data-id='" + users[c]._id + "'> " + users[c].name +
                        " <button class='del-user' data-id='" + users[c]._id + "'>delete</button>  </li>");
                }
            }
            $(".del-user").click(function () {
                deleteUser($(this))
            });
        }
    });
}

function addUser() {
    let name = $('#i-user').val();
    let group = urlParam('group');
    console.log(name);
    console.log(group);
    let request = $.ajax({
        method: "POST",
        url: "http://localhost:2000/users",
        data: {name: name, affected_group : group},
        format: "json",
    });
    request.done(function (message) {
        getUsers();
        message = message.message;
        $("#message").text(message);
    });
    request.fail(function (jqXHR, textStatus) {
        $("#message").text("Le champ est requis !");
    });
}

function deleteUser(div) {
    let user_id = div.attr("data-id");
    let request = $.ajax({
        method: "DELETE",
        url: "http://localhost:2000/user/" + user_id,
        format: "json",
    });
    request.done(function (message) {
        getUsers();
        message = message.message;
        $("#message").text(message);
    });
    request.fail(function (jqXHR, textStatus) {
        $("#message").text("Le champ est requis !");
    });
}
