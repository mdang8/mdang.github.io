/* ********************************************************************************
	getListings()

	- This function returns the HTML contents from IMDB's TV listings page. The URL 
	  structure that IMDB uses has the current date and hour in it. Depending on 
	  the minutes of the current time, the function will round the hour to use the 
	  listings for that time.
******************************************************************************** */     
function getListings(callback) {
	var todayDate = new Date();
	var todayDay = todayDate.getDate();
	var todayMonth = todayDate.getMonth();
	var todayYear = todayDate.getFullYear();
	var hours = todayDate.getHours();
	var minutes = todayDate.getMinutes();

	if (todayDay < 10) {  // adds a zero to the day number if it's a single-digit number
		todayDay = "0" + todayDay;
	}

	if (todayMonth < 10) {  // adds a zero to the month number if it's a single-digit number
		todayMonth = "0" + todayMonth;
	}

	if (hours < 10) {  // adds a zero to the hour number if it's a single-digit number
		hours = "0" + hours;
	}

	var fmtDate = todayYear + "-" + todayMonth + "-" + todayDay;  // Format: XXXX-XX-XX
	var fmtTime = hours + "00";

	var contents;

	$.ajax({
	    //url: "http://www.imdb.com/tvgrid/2015-07-23/2000/?zip=02115&hit_go=0&start_date=2015-07-23&start_time=2000#",
	    url: "http://www.imdb.com/tvgrid/" + fmtDate + "/2000/?zip=02115&hit_go=0&start_date=" + 
	    	fmtDate + "&start_time=" + fmtTime + "#",
	    type: 'GET',
	    success: function(res) {
	        contents = res.responseText;
	        //document.getElementById('statusDiv').innerHTML = contents;
	        callback(contents);
	    }
	});
}


/* ********************************************************************************
	checkForMatrix()

	- This function gets the HTML contents from the getListings() function and 
	  determines if 'The Matrix' is or will be on TV soon.
******************************************************************************** */
function checkForMatrix(show) {
	getListings(function(contents) {
		var isTheMatrixOn = contents.indexOf(show) > -1;
		var statusDiv = document.getElementById('statusDiv');
		var responseGif = document.createElement('img');
		responseGif.id = "responseGif";
		document.getElementById('responseGifDiv').appendChild(responseGif);
		var otherText = document.getElementById('otherText');

		if (isTheMatrixOn) {
			statusDiv.innerHTML = "The Matrix is on.";
			responseGif.src = "img/neoExhaling.gif";
		}
		else {
			document.getElementById('statusDiv').innerHTML = "The Matrix is not on.";
			responseGif.src = "img/neoSMH.gif";
		}
	});
}