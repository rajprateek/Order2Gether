		function goToNextPage(){


		var zioCodeBox = document.getElementById('zipCodeBox');
        var zipCode = zipCodeBox.value;
        var btn = document.getElementById('goToResults');
        var newUrl = 'searchResults.html?location='+zipCode;
        console.log(newUrl)
        document.location.href = newUrl;
    };