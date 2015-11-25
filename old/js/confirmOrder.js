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

function placeOrder(){
    var url = "http://104.236.124.199/orders?"
    

    var url2 = "http://104.236.124.199/order_users?"
    
    var email = getCookie("Email");
    var orderId = Math.floor((Math.random() * 10000) + 1);
    var items = getCookie("items")

    var merchantID = getCookie("merchantId");
    // var merchantURL = "http://sandbox.delivery.com/merchant/"+merchantID+"?client_id=MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
    // var res = httpGet(merchantURL);
    // var total = getCookie("total");
    // var minimum = JSON.parse(res)["merchant"]["ordering"]["minimum"]["delivery"]["lowest"]);
    var location = getCookie("address");
    var params1 = "order%5BprimaryUser%5D=" + email + "&order%5Blocation%5D=" + location + "&order%5BisPlaced%5D=0" + "&order%5Breqd_total%5D="+getCookie("min") + "&order%5BmerchantID%5D=" + merchantID;
    var params2 = "order_user%5Busername%5D="+email+"&order_user%5BorderID%5D="+orderId+"&order_user%5BlistOfItems%5D="+items;
    var response = httpPost(url, params1, email, merchantID, location);
    var res2 = httpPost(url2, params2, email, orderId, items);


    window.alert("Order was successfully placed!");
    document.location.href = "page2.html";
}


function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
};


function httpPost(theUrl, params, email, merchantID, location)
{
    console.log("post method called..");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', theUrl + params, true);
    xhr.send(params);
    return xhr;
};

(function () {
        var elem = document.getElementById("welcome");
        elem.innerHTML = "Hi, "+getCookie("Email")+"!";
    })();


