var client_id = "MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
function getNearbyOrders(){
    var addressBox = document.getElementById('deliveryAddress');
    var address = addressBox.value;
    var newUrl = "http://104.131.244.218/orderbylocation?user_location="+address;
    var response = httpGet(newUrl);
    
    tableHeader();
    handledata(response);
    makeRowsClickable();

}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
};

function addRowToTable(id,orderId, name, toGoal, distance){
    var table2 = document.getElementById("ordersNearby");
    var row2 = table2.insertRow(table2.rows.length);
    row2.id = id+"/"+orderId;
    var cell1 = row2.insertCell(0);
    var cell2 = row2.insertCell(1);
    var cell3 = row2.insertCell(2);
    cell1.innerHTML = name;
    cell2.innerHTML = distance + " meters";
    cell3.innerHTML = "$ "+toGoal.toFixed(2);
};

function tableHeader(){
     var table2 = document.getElementById("ordersNearby");
     if (table2.tHead){
         console.log("head exists");
         return;
     }
     var head = table2.createTHead();
     var row = head.insertRow(0)
     row.style.fontWeight = "bold";
     var cell1 = row.insertCell(0)
     var cell2 = row.insertCell(1)
     var cell3 = row.insertCell(2)


     cell1.innerHTML = "Restaurant";
     cell3.innerHTML = "To Completion"
     cell2.innerHTML = "Distance"

};

function handledata(jsonObj){
    var json = JSON.parse(jsonObj);
    for(var i=0; i<json.length; i++){
        var order = json[i];
        var merchantID = order["merchantID"];
        var orderID = order["id"];
        var reqdTotal = order["reqd_total"];
        var currentTotal = order["order_total"];
        var distance = order["distance"];
        //var currentTotal = order["currentTotal"];
        var name = populateRestaurantName(merchantID);
        addRowToTable(merchantID, orderID, name , reqdTotal-currentTotal, distance);
    }

};

function populateRestaurantName(id){
    var url1 = "http://sandbox.delivery.com/merchant/";
    var urlToQuery  =url1 + id +'?client_id='+client_id;
    var response = httpGet(urlToQuery);
   var response2 = JSON.parse(response);
    var name = response2["merchant"]["summary"]["name"];
    return name;
};

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
};


function makeRowsClickable() {
    var table = document.getElementById("ordersNearby");
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

          row.onclick = function (myrow) {
              return function () {
                  var id = myrow.id;
                  var goal = myrow.cells[2].innerHTML;
                  setCookie("toGoal", goal);
                  var arr = respURL.split("/");
                  var OrderId = arr[arr.length - 1];
                  var merchantId = arr[0];
                  setCookie("OrderId", OrderId);
                  var newUrl = 'restaurantMenuJoinOrder.html?&merchant=' + merchantId;
                  document.location.href = newUrl;
              };
          } (row);
    }
}

function setCookie(name, val){
    var cookieName = name;
    var cookieValue = val;
    document.cookie = cookieName +"=" + cookieValue +";path=/";

}

(function () {
        var elem = document.getElementById("welcome");
        elem.innerHTML = "Hi, "+getCookie("Name")+"!";
    })();

//
