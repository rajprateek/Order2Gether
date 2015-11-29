	console.log("ADDEDDD");
    
    (function(){
		var domain = document.location.toString();
		if(domain.indexOf("venmoId")>=0){
			console.log("yes");
			document.location = "page2.html";
		}
	})();
        
    function goToNextPage(){
	var zioCodeBox = document.getElementById('zipCodeBox');
    var zipCode = zipCodeBox.value;
    setCookie("address", zipCode);
    var btn = document.getElementById('goToResults');
    var newUrl = 'searchResults.html?location='+zipCode;
    console.log(newUrl)
    document.location.href = newUrl;
};

    (function () {
        var elem = document.getElementById("welcome");
        elem.innerHTML = "Hi, "+getCookie("Name")+"!";
    })();


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function setCookie(name, val){
    var cookieName = name;
    var cookieValue = val;
    document.cookie = cookieName +"=" + cookieValue +";path=/";

}


