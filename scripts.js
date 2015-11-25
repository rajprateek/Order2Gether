window.onload = function(){

	var url = "http://sandbox.delivery.com/merchant/search/delivery?address=USA,30332&client_id=MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3"

	$.get(url, function(data){
		console.log(data);
	});


};


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
};
