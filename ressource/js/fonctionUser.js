$(document).ready(function () {
    getUsers();

    $("#add-user-button").click(function () {
        addUser();
    });
    $("#btn-send-gift").click(function () {
        sendGift(urlParam('group'));
        $(this).css("display", "none");
        $("#btn-wish").css('display','block');
        $("#add-user-button").css('display','none');
        $(".del-user").css('display','none');
    });

    $("#btn-wish").click(function () {
        showWish();
    });

    $("#btn-wish-none").click(function () {
        $(this).css('display', 'none');
        $("#btn-wish").css('display', 'block');
        $('#wish').text("");
    });

});

function urlParam(name) {
    let results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

function showWish() {

    let group = urlParam('group');
    $.ajax({
        method :"GET",
        url : "http://localhost:2000/users",
        format : "json",
        success : function (users) {
            for(let c = 0; c<users.length; c++){
                if(users[c].affected_group === group){
                    $.when(getUserById(users[c].affected_user)).then(user => {
                        $("#wish").append(users[c].name + " ========> " + user.name + "</br>");
                        $("#btn-wish").css('display', 'none');
                        $("#btn-wish-none").css('display', 'block');
                    });
                }
            }
        }
    })
}

function getUsers(){
    let group = urlParam('group');
    let send_gift = false;
    $.ajax({
        method :"GET",
        url : "http://localhost:2000/users",
        format : "json",
        success : function (users) {
            $('#users').text('');
            for(let c = 0; c<users.length; c++){
                if(users[c].affected_group === group){
                    $("#users").append("<li class='user'> " + users[c].name +
                    " <i class='del-user del material-icons' data-id='" + users[c]._id + "'>&#xe872;</i> </li>");
                    if(users[c].affected_user !== undefined){
                        send_gift = true;
                    }
                }
            }
            if(send_gift)
            {
                $("#btn-wish").css('display', 'block');
                $("#btn-send-gift").css('display', 'none');
                $("#add-user-button").css('display', 'none');
                $(".del-user").css('display','none');
            }
            $.when(getGroupNameBy(group)).then(group => {
                $("#legend-group").text(group[0].name);
            });
            $(".del-user").click(function () {
                deleteUser($(this));
            });
        }
    })
}

function addUser() {
    let name = $('#i-user').val();
    let group = urlParam('group');
    let request = $.ajax({
        method: "POST",
        url: "http://localhost:2000/users",
        data: {name: name, affected_group: group},
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

function sendGift(group) {

    let listUserId = [];

    let request = $.ajax({
        method: "GET",
        url: "http://localhost:2000/users",
        format: "json",
        success: function (users) {
            for (let c = 0; c < users.length; c++) {
                if(users[c].affected_group === group){
                    listUserId.push(users[c]._id);
                }
            }
            echange(shuffle(listUserId));
        }
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

function getUserById(id) {
    return $.ajax({
        method: "GET",
        url: "http://localhost:2000/user/" + id,
        format: "json",
        success: function (result) {
            return result;
        }
    });
}
function getGroupNameBy(id) {
    return $.ajax({
        method: "GET",
        url: "http://localhost:2000/group/" + id,
        format: "json",
        success: function (result) {

        }
    });
}
function shuffle(list) {
    list.sort(() => Math.random() - 0.5);
    return list;
}

function echange(list) {

    for (let i = 0; i < list.length; i++) {
        if (i === 0) {
            $.ajax({
                method: "PUT",
                url: "http://localhost:2000/user/" + list[0],
                format: "json",
                data: {affected_user: list[list.length - 1]}
            });
        } else {
            $.ajax({
                method: "PUT",
                url: "http://localhost:2000/user/" + list[i],
                format: "json",
                data: {affected_user: list[i - 1]}
            });
        }
    }
}