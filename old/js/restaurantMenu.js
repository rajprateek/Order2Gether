var alreadyChecked = "";
var classTypes = [];
var itemsSelected = [];
var totPrice =0.0;
var itemsPrices = [];
var ItemNames = [];
var url1 = "http://sandbox.delivery.com/merchant/";
var url2 = "/menu";
var client_id = "MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
var minimum = 0;
(function (){
    var merchant = getUrlParameter('merchant');
    if(merchant==undefined){
        return;
    }
    setCookie("merchantId", merchant);
    populateRestaurantName(merchant);

    var merchantURL = "http://sandbox.delivery.com/merchant/"+merchant+"?client_id=MTExNTBjNTgyOGQ0NTFiOTc0ZWI1MTg1MGQ3NmYxYjE3";
    var res = httpGet(merchantURL);
    minimum = res["merchant"]["ordering"]["minimum"]["delivery"]["lowest"];
    setCookie("min", minimum);

    var jsonObj = getJSONfromApi(merchant);

     for (var type in jsonObj["menu"]){
        
         for (child in jsonObj["menu"][type]["children"]){
            
             var name = jsonObj["menu"][type]["children"][child]["name"];
             var classType = jsonObj["menu"][type]["name"];
             var price = jsonObj["menu"][type]["children"][child]["price"];
             var id = jsonObj["menu"][type]["children"][child]["id"];
             console.log(name+" "+classType+" "+ price +" "+ id);   
             addToResultTable(classType, id, name, price);
             

         }
     }
     colorTypes();
     makeRowsClickable();


})();

function populateRestaurantName(id){
    var urlToQuery  =url1 + id +'?client_id='+client_id;
    var response = httpGet(urlToQuery);
    var name = response["merchant"]["summary"]["name"];
    document.getElementById("rname").innerHTML = name;
    setCookie("restaurant", name);
    console.log(name);

}

function colorTypes(){
    console.log(classTypes);
     var table = document.getElementById("menu");
    var rows = table.getElementsByTagName("tr");
    for (i = 0; i < table.rows.length; i++) {
            var row = table.rows[i];
            var id = row.id;
            console.log(id);
            if (classTypes.indexOf(row.id)>=0){
                document.getElementById(id).style.background="#BFBFC1";
            }
        }
};

// window.addEventListener('DOMContentLoaded',function(){
//    for(id in classTypes){
//         document.getElementById(classTypes[id]).style.background = "white";
//         console.log(document.getElementById(classTypes[id]));
//     } 

//     }, false);


function addToResultTable(classType, id, name, price){

    if(classTypes.indexOf(classType.toUpperCase())<0){
        var table = document.getElementById("menu");
        var row = table.insertRow(table.rows.length);
        row.id = classType.toUpperCase();
        var cell1 = row.insertCell(0);
        cell1.innerHTML = classType.toUpperCase();
        var cell2 = row.insertCell(1);
        cell2.innerHTML = "";
        alreadyChecked =classType.toUpperCase();
        classTypes.push(classType.toUpperCase());
               
        
    }
        var table2 = document.getElementById("menu");
        var row2 = table2.insertRow(table2.rows.length);
        row2.id = id;
        var cellz1 = row2.insertCell(0);
        var cellz2 = row2.insertCell(1);
        cellz1.innerHTML = name;
        cellz2.innerHTML = "$"+price;

};

function getJSONfromApi(merchant){   
    var urlToQuery = url1+merchant + url2 + "?client_id="+client_id;
    console.log(urlToQuery);

    var response = httpGet(urlToQuery);
    //console.log(response["menu"][0]["children"][0]["name"]);
    //var jsonObj = $.parseJSON(response);
    return response;
};

function httpGet(theUrl)
{
    var response = "";

    jQuery.ajax({
        url: theUrl,
        success: function (result) {
            //console.log(result);
            response = result;
        },
        async: false
    });
   // console.log(response);

    return response;
};

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

function makeRowsClickable() {
    var table = document.getElementById("menu");
    var rows = table.getElementsByTagName("tr");
    for (i = 1; i < rows.length; i++) {
        var row = table.rows[i];
        var id = row.id;
        if (classTypes.indexOf(id)>=0){
            continue;
        }
        row.onmouseenter = function(myrow){
              return function() { 
                var id = myrow.id;
                 document.getElementById(id).style.cursor="pointer";
                 if(document.getElementById(id).style.background.toString().indexOf("aquamarine")<0){
                 document.getElementById(id).style.background="#37C4FC";
             }
              };
          }(row);

        row.onmouseout = function(myrow){
              return function() { 
                var id = myrow.id;
                
                if(document.getElementById(id).style.background.toString().indexOf("aquamarine")<0){
                document.getElementById(id).style.background="white";

                }
              };
          }(row);

          row.onclick = function (myrow) {
              return function () {
                  var id = myrow.id;
                  if (document.getElementById(id).style.background.toString().indexOf("aquamarine") >= 0) {
                      console.log(myrow.cells[1]);

                      var ndx = itemsSelected.indexOf(id);
                      itemsSelected.splice(ndx, 1);
                      ItemNames.splice(ndx, 1);
                      itemsPrices.splice(ndx, 1);
                      document.getElementById(id).style.background = "white";
                      totPrice -= (parseFloat(myrow.cells[1].innerHTML.substring(1), 10));
                      updateTotal();
                      printDiff(totPrice,minimum);
                  }
                  else {
                      itemsSelected.push(id);
                      ItemNames.push(myrow.cells[0].innerHTML);
                      itemsPrices.push(myrow.cells[1].innerHTML);
                      console.log(myrow.cells[1].innerHTML);
                      totPrice += (parseFloat(myrow.cells[1].innerHTML.substring(1), 10));
                      updateTotal();
                      document.getElementById(id).style.background = "aquamarine";
                      printDiff(totPrice,minimum);
                  }

                  var newUrl = 'restaurantMenu.html?merchant=' + id;

                  console.log(itemsSelected);
                  //updateItemsSelectedCookie();
                  //document.location.href = newUrl;
              };
          } (row);
    }
}

function printDiff(total, minimum){
  var remainingPer = (parseFloat(totPrice))*100/parseFloat(minimum);
  var str = ""
  if(remainingPer <100){
    str = "Percent complete: "+remainingPer.toFixed(0)+"%";
  }
  else{
    str = "Percent complete: 100%"
  }
  document.getElementById("myTotal").innerHTML= str;
  console.log("THE MINIMUM: " + remainingPer);

}
function updateItemsSelectedCookie(){
    var strng = itemsSelected.join("|");
    setCookie("items", strng);
    var string2 = ItemNames.join("|");
    setCookie("itemsNames", string2);
    var string3 = itemsPrices.join("|");
    setCookie("itemPrices", string3);
}

function updateTotalCookie(){
    setCookie("total", totPrice.toFixed(2));
}

function updateTotal(){
    var elem = document.getElementById("total");
    elem.innerHTML = "Total: $"+totPrice.toFixed(2);

}

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
        elem.innerHTML = "Hi, "+getCookie("Email")+"!";
    })();