var pos = document.querySelector("#pos");
var log = document.querySelector("#log");
var geoOptions = {
    maximumAge: 10000,
    enableHighAccuracy: true
};
var j = JSON.stringify;
var map, marker;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: {lat: 47.095670, lng: 37.550172},
        disableDefaultUI: true,
        draggable: false,
        keyboardShortcuts: false,
        disableDoubleClickZoom: true,
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, errorPosition, geoOptions);
    } else {
        pos.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position, color) {

    var coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    if (pos.dataset.coords === j(coords)) {
        return;
    }
    pos.dataset.coords = j(coords);

    if (marker) {
        var latLng = new google.maps.LatLng(coords.lat, coords.lng);
        marker.setPosition(latLng);
        map.panTo(latLng);
    } else {
        marker = new google.maps.Marker({
            position: coords,
            map: map,
            animation: google.maps.Animation.BOUNCE
        });
    }

    var lastLoc = pos.querySelector('.loc:first-child');
    if (lastLoc) {
        var firstLog = log.querySelector('.loc:first-child');
        // log.insertBefore(lastLoc, firstLog);
        pos.removeChild(lastLoc);
    }

    pos.innerHTML =
        "<div class='loc'>" +
        "Latitude: " + coords.lat +
        "<br>Longitude: " + coords.lng + '</div>';

}
function errorPosition(e) {
    console.log(e);
}
