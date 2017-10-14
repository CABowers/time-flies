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

var database = null;
/*
 * Home
 */
var submit_form = function() {
	// get form data
	document.getElementById("message").innerHTML = "";
	var name = document.getElementById("lastname").value;
	var confirmation = document.getElementById("confirmation").value;
	var location = document.getElementById("location").value;	
	if(database["bookings"][confirmation] != undefined && database["bookings"][confirmation].lastname === name) {
		$(document.getElementById("data-panel")).removeClass("hide");
		$(document.getElementById("no-data")).addClass("hide");
		displayGraphs();
	} else {
		document.getElementById("message").innerHTML = "Invalid Information";
	}
}

var calculateTime = function() {
	// calculates the departure time
}

var displayGraphs = function() {
	// creates and shows the timeline
	// creates and shows heatmap
	// 
	// Gets most updated info
}

/*
 * HeatMap
 */
var getAirportInfo = function() {
	//Gets airport info depending on what option is filled out
}

var populateData = function() {
	// populates heat graph with data
}