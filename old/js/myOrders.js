var client_id = "MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
var total = 0.0;


(function(){



var url = "http://104.236.124.199/orders.json"
var url2 = "http://104.236.124.199/order_users.json"


var response1 = getJSONfromApi(url);
var response2 = getJSONfromApi(url2);
var merchantId = "";
//console.log("Fubusged");
for(order in response1){
  var user = response1[order]["primaryUser"];
  if(user.localeCompare(getCookie("Email"))==0){
    merchantId = response1[order]["merchantID"];
  }

}

if ((""+merchantId).localeCompare("")==0){
    //console.log("ret1");

  return;
}

var items = "";
for(userorder in response2){
  var user = response2[userorder]["username"];
  if(user.localeCompare(getCookie("Email"))==0){
    items = response2[userorder]["listOfItems"];
  }
}

if (items.localeCompare("")==0){
  //console.log("ret2");
  return;
}
var listOfItems = items.split("|");

//console.log(listOfItems);
//console.log(merchantId);

populateRestaurantName(merchantId);
var merchantURL = "http://sandbox.delivery.com/merchant/"+merchantId+"?client_id=MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
   //var res = JSON.parse(httpGet(merchantURL));
    var jsonObj = getJSONfromApi2(merchantId);
    //console.log(jsonObj);
    //console.log(listOfItems);
    listOfItems.push("E9")
     for (var type in jsonObj["menu"]){
         for (child in jsonObj["menu"][type]["children"]){
           //console.log(id);
             var name = jsonObj["menu"][type]["children"][child]["name"];
             var price = jsonObj["menu"][type]["children"][child]["price"];

             var id = jsonObj["menu"][type]["children"][child]["id"];
             //console.log("HEREEEEEEEEEEEE");
             if(listOfItems.indexOf(id)<0){
              continue;
             }
             //onsole.log(name+" "+classType+" "+ price +" "+ id);   
             addToResultTable(id, name, price);
             

         }
     }

     document.getElementById("total").innerHTML = "$"+total.toFixed(2);

})();

function populateRestaurantName(id){

  var url1 = "http://sandbox.delivery.com/merchant/";
    var urlToQuery  =url1 + id +'?client_id='+client_id;
    var response2 = httpGet(urlToQuery);
    console.log(response2);
    var response = JSON.parse(response2);
    console.log(response);
    var name = response["merchant"]["summary"]["name"];
    document.getElementById("rname").innerHTML = "Order for "+ name;
}


function addToResultTable( id, name, price){

      //console.log("adding to table");
        var table2 = document.getElementById("order");
        var row2 = table2.insertRow(1);
        row2.id = id;
        var cellz1 = row2.insertCell(0);
        var cellz2 = row2.insertCell(1);
        cellz1.innerHTML = name;
        total += parseFloat(price);
        cellz2.innerHTML = "$"+price;

};

function httpGet(theUrl)
{ 
    //console.log(theUrl);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
};


function getJSONfromApi(url){   
    var url2 = url; 

    var response = httpGet(url2);
    var jsonObj = JSON.parse(response);
    return jsonObj;
};

function getJSONfromApi2(merchant){   
  var url1 = "http://sandbox.delivery.com/merchant/";
var url2 = "/menu";
    var urlToQuery = url1+merchant + url2 + "?client_id="+client_id;
    //console.log(urlToQuery);

    var response = httpGet(urlToQuery);
    //console.log(response);
    var jsonObj = $.parseJSON(response);
  //  console.log(jsonObj);
    return jsonObj;
};


function setCookie(name, val){
    var cookieName = name;
    var cookieValue = val;
    document.cookie = cookieName +"=" + cookieValue +";path=/";

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
