(function(){
			var domain = document.location.toString();
			if(domain.indexOf("username")>=0){
				console.log("yes");
				document.location = "index.html";
			}
		})();


		$(document).ready(function () {
		    $('#login-form-link').click(function (e) {
		        $("#login-form").delay(100).fadeIn(100);
		        $("#register-form").fadeOut(100);
		        $('#register-form-link').removeClass('active');
		        $(this).addClass('active');
		        e.preventDefault();
		    });
		    $('#register-form-link').click(function (e) {
		        $("#register-form").delay(100).fadeIn(100);
		        $("#login-form").fadeOut(100);
		        $('#login-form-link').removeClass('active');
		        $(this).addClass('active');
		        e.preventDefault();
		    });
		    $('#login-submit').click(function (e) {
		        console.log("Clicked..");
		        var url = "http://104.236.124.199/users?";

		        // document.getElementById("login-form").setAttribute("action", "page2.html");
		        var flag = false;
		        var jsonObj = getJSONfromApi();
		        for (var id in jsonObj) {
		            var user = jsonObj[id];
		            var email = user['email'];
		            console.log(email);
		            if ((document.getElementById('username').value).localeCompare(email) === 0) {
		                console.log("It's a match");
		                setCookie("Email", email);
		                setCookie("rand", "hi");
		                document.getElementById("login-form").setAttribute("action", "page2.html");
		                flag = true;
		            }

		        }
                if(!flag)
		        setTimeout(alert("Invalid username/password "), 2000);

		    });

		    $("#register-submit").click(function (e) {

		        console.log("register button clicked");
		        var username = document.getElementById("username1").value;
		        var email = document.getElementById("email").value;
		        var pass = document.getElementById("password1").value;
		        var confirm_pass = document.getElementById("confirm-password").value;
		        if (pass.localeCompare(confirm_pass) == 0) {
		            console.log("passwords match!");
		            var url = "http://104.236.124.199/users?";
		            var response = httpPost(url, username, email);
		            window.alert("posted");
		            //var jsonObj = JSON.parse(response);
		            setCookie("Email", email);
		            document.getElementById('register-form').setAttribute("action", "page2.html");


		        }
		        //var a = "world";
		        //setTimeout(alert("Hello " + a), 2000);

		    })
		});

function setCookie(name, val){
    var cookieName = name;
    var cookieValue = val;
    document.cookie = cookieName +"=" + cookieValue +";path=/";

}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
};

function httpPost(theUrl, theUsername, theEmail)
{
	console.log("post method called..");
    var xhr = new XMLHttpRequest();
    var params = "user%5Bname%5D=" + theUsername + "&user%5Bemail%5D=" + theEmail;
	xhr.open('POST', theUrl + params, true);
	console.log(params);
	xhr.send(params);
    return xhr.responseText;
};

function getJSONfromApi(){   
    var url2 = "http://104.236.124.199/users.json"; 

    var response = httpGet(url2);
    var jsonObj = JSON.parse(response);
    return jsonObj;
};

function foo(){
	window.alert("here")
	window.location.href="page2.html";
}