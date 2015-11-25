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

var urlToQuery = "http://104.236.124.199/search?location=";

(function (){
    var location = getUrlParameter('location');
    if(location==undefined){
        return;
    }


    var jsonObj = getJSONfromApi(location);
    console.log(jsonObj);

    for (var id in jsonObj){
        var restaurantObj = jsonObj[id];
        var name = restaurantObj['name'];
        var distance = restaurantObj['distance'].toFixed(2) + " mi";
        var cuisine = restaurantObj['cuisine'];
        addToResultTable(id, name, distance, cuisine);
    }
    makeRowsClickable()


})();

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
};


function getJSONfromApi(location){   
    var url2 = "http://104.236.124.199/search?location=" + location; 

    var response = httpGet(url2);
    var jsonObj = JSON.parse(response);
    return jsonObj;
};


function addToResultTable(merchantId, name,  dist,  cuisine){
    var table = document.getElementById("results");
    var row = table.insertRow(1);
    row.id = merchantId;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = name;
    cell2.innerHTML = cuisine;
    cell3.innerHTML = dist;

};

function makeRowsClickable() {
    var table = document.getElementById("results");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var row = table.rows[i];
        row.onmouseenter = function(myrow){
              return function() { 
                 var id = myrow.id;
                 document.getElementById(id).style.cursor="pointer";
                 document.getElementById(id).style.background="#BFBFC1";
              };
          }(row);

        row.onmouseout = function(myrow){
              return function() { 
                 var id = myrow.id;

                 document.getElementById(id).style.background="white";
              };
          }(row);

        row.onclick = function(myrow){
              return function() { 
                 var id = myrow.id;

                 var newUrl = 'restaurantMenu.html?&merchant='+id ;
                document.location.href = newUrl;
              };
          }(row);
    }
}

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

(function () {
        var elem = document.getElementById("welcome");
        elem.innerHTML = "Hi, "+getCookie("Email")+"!";
    })();
