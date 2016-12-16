var wickedlyCoords = {
	latitude: 47.624851,
	longitude: -122.52099
};

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	}
	else {
		alert("no geolocation support");
	}
}
function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var displayP = document.getElementById("outMyLocation");
	displayP.innerHTML = "I'm at latitude: " + latitude + ", longitude: "
	 + longitude;

	 var km = computeDistance(position.coords, wickedlyCoords);
	 var distance = document.getElementById("distance");
	 distance.innerHTML = "I'm " + km + "km from the WickedlySmart HQ!";

}
function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not available",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var displayP = document.getElementById("outMyLocation");
	displayP.innerHTML = errorMessage;
}


//半正矢公式
function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);

	var Radius = 6371; //radius of the Earth in km
	var distance = Math.acos(Math.sin(startLatRads) *
					Math.sin(destLatRads) + Math.cos(startLatRads) *
					Math.cos(destLatRads) * Math.cos(startLongRads - 
					destLongRads)) * Radius;
	return distance;

}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}

window.onload = getMyLocation;