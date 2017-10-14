var populateCodes = function() {
	document.getElementById("airports").innerHTML += "<option value='HI'>";

	$.getJSON("airports.json", function( json ) {  // Missing this curly brace.
  		$.each(json, function(key, value) {
    		// Change key and json[key] to json[key].value and json[key].title
    		console.log(key);
    		console.log(value);
    		$('select[name=cars]').append('<option value="' + json[key].value + '">' + json[key].name + ' ('+ json[key].iata + ')' + '</option>');
  		}); 
	});
}


var getAirportInfo = function() {
	//Gets airport info depending on what option is filled out
}

var populateData = function() {
	// populates heat graph with data
}

var checkTSATime = function() {
	//ensures TSA time has been selected before moving to next page
}

var getCurrentLocation = function() {
	//gets user current location from form
}

var calculateTime = function() {
	//calculates the departure time
}

var displayTimeline = function() {
	//creates and shows the timeline
}