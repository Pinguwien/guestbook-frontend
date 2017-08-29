$(document).ready(function() {

    var keycloak = Keycloak({
        url: 'http://localhost:8080/auth',
        realm: 'springboot-example',
        clientId: 'guestbook-frontend-app',
    });

    keycloak.init({ onLoad: 'login-required'
    }).success(
        function(){
            console.log('authenticated!');
            console.log('username:' + keycloak.username);
            console.log('token:' + keycloak.token);

        })
        .error(
            function(){
                console.log('tilt')
            });

	$(".successarea").hide();

    $("#send").on("click", function() {
	
		var data = {
			title:$("#title").val(),
			comment:$("#comment").val(),
			commenter:$("#commenter").val()
		};
		
		$.ajax({
			url:"http://127.0.0.1:8090/guestbook",
			method:"PUT",
            headers: {
                "Authorization": "Bearer " + keycloak.token
            },
            contentType:"application/json",
			data:JSON.stringify(data),
			success:function() {
				$(".successarea").show();
				$("form").hide();
			},
			error:function() {
				console.log("Etwas hat beim hinzufügen nicht geklappt!");
			}
		});
	});
});
