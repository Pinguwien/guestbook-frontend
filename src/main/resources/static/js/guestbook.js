$(document).ready(function() {

    var keycloak = Keycloak({
        url: 'http://localhost:8080/auth',
        realm: 'springboot-example',
        clientId: 'guestbook-frontend-app',
    });

	var refresh = function() {

        $("#content").empty();

        keycloak.init({ onLoad: 'login-required'
        }).success(
            function(data){
                console.log('authenticated!');
                getEntries(data);
            })
            .error(
                function(){
                    console.log('tilt')});
	};

    var getEntries = function(){
        console.log('username:' + keycloak.username);
        console.log('token:' + keycloak.token);

        $.ajax({
            url:"http://127.0.0.1:8090/guestbook",
            method:"GET",
            headers: {
                "Authorization": "Bearer " + keycloak.token
            },
            success:function(data) {
                for(var i=0; i<data.length; i++) {

                    var tr = $("<tr />");
                    var td = $("<td />");

                    td.append($("<div class='lead' />").text(data[i].title));
                    td.append($("<div />").text(data[i].comment));
                    td.append($("<div class='small text-muted' />").text(data[i].date + " von " + data[i].commenter));

                    tr.append(td);

                    $("#content").append(tr);
                }
            },
            error:function() {
                console.log("etwas hat beim Anzeigen nicht geklappt!");
            }
        });
    };

    refresh();
	$("#refresh").off("click").on("click", refresh);
});


