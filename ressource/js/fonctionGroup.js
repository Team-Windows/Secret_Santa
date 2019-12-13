$(document).ready(function() {
    getGroups();
    $("#form-add-group").submit(function (event) {
        event.preventDefault();
        addGroup();
    });
});

function getGroups(){
    $.ajax({
        method :"GET",
        url : "http://localhost:2000/groups",
        format : "json",
        success : function (groups) {
            $('#groups').text('');
            for(let c = 0; c<groups.length; c++){
                $("#groups").append("<li class='group''> " +
                    "" + "<a href='group.html?group="+ groups[c]._id + "'> " + groups[c].name + "</a>"  + ""
                    + "<button class='del-group' data-id='" + groups[c]._id + "'>delete</button>  </li>");
            }
            $(".del-group").click(function () {
                deleteGroup($(this))
            });
        }
    })
}

function addGroup() {
    let name = $('#i-group').val();
    let request = $.ajax({
        method :"POST",
        url : "http://localhost:2000/groups",
        data : {name : name},
        format : "json",
    });
    console.log(request);
    request.done(function( message ) {
        getGroups();
        message = message.message;
        $( "#message" ).text( message );
    });
    request.fail(function( jqXHR, textStatus ) {
        $("#message").text("Le champ est requis !");
    });
}

function deleteGroup(div) {
    let group_id = div.attr("data-id");
    let request = $.ajax({
        method :"DELETE",
        url : "http://localhost:2000/group/" + group_id,
        format : "json",
    });
    request.done(function( message ) {
        getGroups();
        message = message.message;
        $( "#message" ).text( message );
    });
    request.fail(function( jqXHR, textStatus ) {
        $("#message").text("Le champ est requis !");
    });
}