function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


(function (){
var zipCode = getUrlParameter('zipcode');
if(zipCode==undefined){
    return;
}


var results = getResultsfromApi(zipCode);
var url = 'https://api.delivery.com/merchant/search/delivery?client_id=ODZjMzVlYTk2Nzk1OGUyNTJhNmU2YjdjM2U3OWY5ODNk&address="USA,30332"&user-agent=';
// $.get(url)
console.log($.get(url));

addToResultTable("A","B","C");

console.log("sucess")

})();

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


function getResultsfromApi(zipCode){   

}


function addToResultTable( name,  dist,  cuisine){
    var table = document.getElementById("results");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = name;
    cell2.innerHTML = dist;
    cell3.innerHTML = cuisine;

}


