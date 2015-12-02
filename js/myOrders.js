var client_id = "MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
var total = 0.0;
var classTypes = [];
var subTotal = 0.0;
var total2 = 0.0;
var minReqd = 0.0;
var flag = false;
var orderID = "";
(function(){



var url = "http://104.131.244.218/orders.json"
var url2 = "http://104.131.244.218/user_orders.json"
var url3  = "http://104.131.244.218/minionlookup?fbid="+getCookie("Email");

var cPrimary = getJSONfromApi(url3);
console.log(cPrimary);
var merchantId = "";
//if the user is a minion, continue as before
if(cPrimary["isPlaced"]==undefined){
var response1 = getJSONfromApi(url);
var response2 = getJSONfromApi(url2);


var orderID1 = -1;
var items = "";

for(userorder in response2){
  var user = response2[userorder]["Username"];
  console.log(user);
  console.log(getCookie("Email"));
  if(user.localeCompare(getCookie("Email"))==0){
    items = response2[userorder]["Listofitems"];
    orderID1 = response2[userorder]["OrderID"];
    console.log("Set oRDER ID TO" + orderID1);
    break;
  }
}

for(order in response1){
  //var user = response1[order]["primaryUser"];
  console.log("ID is "+ response1[order]["id"]);
  if(response1[order]["id"]==orderID1){
    merchantId = response1[order]["merchantID"];
  }
}
if ((""+merchantId).localeCompare("")==0){
    //console.log("ret1");

  return;
}
if (items.localeCompare("")==0){
  //console.log("ret2");
  return;
}
var listOfItems = items.split("|");

console.log(listOfItems);
//console.log(merchantId);

populateRestaurantName(merchantId);
var merchantURL = "http://sandbox.delivery.com/merchant/"+merchantId+"?client_id=MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
   //var res = JSON.parse(httpGet(merchantURL));
    var jsonObj = getJSONfromApi2(merchantId);

    console.log(jsonObj);
    //console.log(listOfItems);
    //listOfItems.push("E9")
     for (var type in jsonObj["menu"]){
         for (child in jsonObj["menu"][type]["children"]){
           //console.log(id);
             var name = jsonObj["menu"][type]["children"][child]["name"];
             var price = jsonObj["menu"][type]["children"][child]["price"];

             var id = jsonObj["menu"][type]["children"][child]["id"];
             
             if(listOfItems.indexOf(id)<0){
              continue;
             }
             //onsole.log(name+" "+classType+" "+ price +" "+ id);   
             addToResultTable(id, name, price);
             

         }
     }

     document.getElementById("total").innerHTML = "$"+ (total.toFixed(2));

     document.getElementById("minionTable").style.visibility = "visible";

     }
     //if the user is primary user, do other stuff and populate a different table.
     else{
        var primaryObj = cPrimary;
       
          merchantId = primaryObj["merchantID"];
          var jsonObj = getJSONfromApi2(merchantId);
         populateRestaurantName(merchantId);
     
        //var listOfItems = primaryObj["primaryUser"].split("|");
          


          var merchantURL = "http://sandbox.delivery.com/merchant/"+merchantId+"?client_id=MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
  
         
          //getItemInfoAndAddToTable("Your Order", jsonObj, listOfItems );
          orderID = primaryObj["orderID"];
          var minions = primaryObj["minions"];
          for(var minion in minions){
              console.log(minion);
                  var personName = minions[minion]["name"];
                  var venmoId = minions[minion]["venmoID"];
                  var phoneNumber = minions[minion]["phone"];
                  var subTotal = minions[minion]["total"];
                  console.log(minions[minion]["listOfItems"]);
                  var listOfItems = minions[minion]["listOfItems"].split("|");
                  getItemInfoAndAddToTable(personName,venmoId,phoneNumber,jsonObj, listOfItems,subTotal);
          }
           var table = document.getElementById("order2");
            var row = table.insertRow(table.rows.length);
            row.style.fontWeight="bold";
             var cell1 = row.insertCell(0);
            cell1.innerHTML = "" ;
            var c = row.insertCell(1);
            var c1 = row.insertCell(2);
            c.innerHTML="";
            c1.innerHTML="";
             var cell4 = row.insertCell(3);
            cell4.innerHTML = "Total: $"+total2.toFixed(2);

              document.getElementById("primaryTable").style.visibility = "visible";

              if(minReqd<total2){
                  document.getElementById("placeOrder").style.visibility = "visible";
                  document.getElementById("venmo").style.visibility = "visible";
              }

     }

})();


function getItemInfoAndAddToTable(personName, venmoId,phoneNumber, jsonObj, listOfItems,subTotal){

    for (var type in jsonObj["menu"]){
             for (child in jsonObj["menu"][type]["children"]){
         
                 var name = jsonObj["menu"][type]["children"][child]["name"];
                 var price = jsonObj["menu"][type]["children"][child]["price"];

                 var id = jsonObj["menu"][type]["children"][child]["id"];
             
                 if(listOfItems.indexOf(id)<0){
                  continue;
                 }
                 addToResultTable2(personName, venmoId,phoneNumber, id, name, price, subTotal);
             }
         }
}

function addToResultTable2(classType, venmoId,phoneNumber, id, name, price, subTotal){

    if(classTypes.indexOf(classType.toUpperCase())<0){
        var table = document.getElementById("order2");
        if(flag){
            var row2 = table.insertRow(table.rows.length);
            var cellz = row2.insertCell(0);
            var cellz = row2.insertCell(1);
            var cellz = row2.insertCell(2);
            var cellz = row2.insertCell(3);
        }
        var row = table.insertRow(table.rows.length);
        row.style.fontWeight = "bold";
        row.style.background= "#BFBFC1";
        row.id = classType.toUpperCase();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = classType+"'s Order" ;

         var cell2 = row.insertCell(1);
        cell2.innerHTML = "Venmo ID: "+venmoId;

        var cell3 = row.insertCell(2);
        cell3.innerHTML = "Phone Number: "+ phoneNumber;

       
        var cell4 = row.insertCell(3);
        cell4.innerHTML = "Subtotal: $" + subTotal;
        total2 += parseFloat(subTotal);
        alreadyChecked =classType.toUpperCase();
        classTypes.push(classType.toUpperCase());
        flag = true;
        
    }
        var table2 = document.getElementById("order2");
        var row2 = table2.insertRow(table2.rows.length);
        row2.id = id;
        var cellz1 = row2.insertCell(0);
        var c2 = row2.insertCell(1);
        var c3 = row2.insertCell(2);
        c2.innerHTML="";
        c3.innerHTML="";
        var cellz2 = row2.insertCell(3);
        cellz1.innerHTML = name;
        cellz2.innerHTML = "$"+price;

};

function populateRestaurantName(id){

  var url1 = "http://sandbox.delivery.com/merchant/";
    var urlToQuery  =url1 + id +'?client_id='+client_id;
    var response2 = httpGet(urlToQuery);
    //console.log(response2);
    var response = JSON.parse(response2);
    minReqd = parseFloat(response["merchant"]["ordering"]["minimum"]["delivery"]["lowest"]);
    //console.log(minReqd);
    //console.log(response);
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
        //console.log(total);
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
    console.log(response);
    var jsonObj = JSON.parse(response);
    return jsonObj;
};

function getJSONfromApi2(merchant){   
console.log(merchant);
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




(function () {
        var elem = document.getElementById("welcome");
        elem.innerHTML = "Hi, "+getCookie("Name")+"!";
    })();


function placeOrder(orderId){
    var url = "http://104.131.244.218/orders/" + orderID + ".json";
    var resp = httpGet(url);
    var parsedResp = JSON.parse(resp);
    var pUser = parsedResp["primaryUser"];
    var loc = parsedResp["location"];
    var isPlaced = 1;
    var reqdTot = parsedResp["reqd_total"];
    var mer = parsedResp["merchantID"];
    url = "http://104.131.244.218/orders/" + orderID+"?";
    //var params = "_method=patch&"+;


    $.ajax({
        url: 'http://104.131.244.218/orders/2?order%5BprimaryUser%5D=10208220106523777&order%5Blocation%5D=%22+NW+Atlanta+30332%22&order%5BisPlaced%5D=1&order%5Breqd_total%5D=20.0&order%5BmerchantID%5D=74685&commit=Update+Order',
        type: 'PUT',
        success: function (response) {
            alert("PUT worked");
        }
    });
    //var re = chargeURLPut(url+params);
    //console.log(re);
}

function sendVenmoRequests(){
    alert("send venmo");
}

function httpPost(theUrl, params)
{
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', theUrl + params, true);
    xhr.send(params);
    return xhr;
};

var xmlHttp = new XMLHttpRequest(); //returns a XMLHttpRequest object
function chargeURLPut(url) { 
    var mimeType = "text/plain";  
    xmlHttp.open('PUT', url, true);  // true : asynchrone false: synchrone
    xmlHttp.setRequestHeader('Content-Type', mimeType);  
    xmlHttp.send(null); 
 }