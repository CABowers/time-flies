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