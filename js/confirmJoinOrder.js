(function () {


    var name = getCookie("restaurant");
    document.getElementById("rname").innerHTML = name;
    var total = getCookie("total");
    console.log(total);
    document.getElementById("total").innerHTML = "$" + total;

    var itemNames = getCookie("itemsNames").split("|");
    var itemPrices = getCookie("itemPrices").split("|");
    var itemIds = getCookie("items").split("|");
    for (var item in itemNames) {

        var name = itemNames[item];
        var price = itemPrices[item];
        var id = itemIds[item];
        addToResultTable(id, name, price);
    }

})();

function addToResultTable(id, name, price){
    var table = document.getElementById("summary");
    var row = table.insertRow(1);
    row.id = id;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);

    cell1.innerHTML = name;
    cell2.innerHTML = price;
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

var params2 = "";
var url2 = "";
function placeOrder(){
    var url = "http://104.131.244.218/orders?"
    

    url2 = "http://104.131.244.218/user_orders?"
    
    var email = getCookie("Email");
   // var orderId = Math.floor((Math.random() * 10000) + 1);
    var items = getCookie("items")

    var merchantID = getCookie("merchantId");
    // var merchantURL = "http://sandbox.delivery.com/merchant/"+merchantID+"?client_id=MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
    // var res = httpGet(merchantURL);
    // var total = getCookie("total");
    // var minimum = JSON.parse(res)["merchant"]["ordering"]["minimum"]["delivery"]["lowest"]);
    var location = getCookie("address");
    // var params1 = "order%5BprimaryUser%5D=" + email + "&order%5Blocation%5D=" + location + "&order%5BisPlaced%5D=0" + "&order%5Breqd_total%5D="+getCookie("min") + "&order%5BmerchantID%5D=" + merchantID;
    params2 = "user_order%5BUsername%5D="+email+"&user_order%5BListofitems%5D="+items+"&user_order%5BTotal%5D="+ getCookie("total");
    var OrderID = getCookie("OrderId");
    params2 += "&user_order%5BOrderID%5D=" + OrderID;
    var response = httpPost2(url2, params2);
     window.alert("Order is live!");

    
       
    

}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
};

 var xhr = new XMLHttpRequest();
 xhr.onreadystatechange = function () {
     if (xhr.readyState == 4 && xhr.status == 200) {
         var respURL = xhr.responseURL;
         var arr = respURL.split("/");
         var orderID = arr[arr.length - 1];
         console.log(orderID);
         params2 += "&user_order%5BOrderID%5D=" + orderID;
         var res2 = httpPost2(url2, params2);
         window.alert("Order is live!");
         document.location.href = "page2.html";
     }
 }

function httpPost2(theUrl, params)
{
    console.log("post method called.."+theUrl+params);
    //var xhr = new XMLHttpRequest();
    var xhr2 = new XMLHttpRequest();

    xhr2.open('POST', theUrl + params, true);
    xhr2.send(params);
    return xhr2;
};

function httpPost(theUrl, params)
{
    console.log("post method called.."+theUrl + params);
    //var xhr = new XMLHttpRequest();


    xhr.open('POST', theUrl + params, true);
    xhr.send(params);
    return xhr;
};

(function () {
        var elem = document.getElementById("welcome");
        elem.innerHTML = "Hi, "+getCookie("Name")+"!";
    })();


