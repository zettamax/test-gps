var pos = document.querySelector("#pos");
var log = document.querySelector("#log");
var geoOptions = {
    maximumAge: 10000,
    enableHighAccuracy: true
};
var j = JSON.stringify;
var map, marker;

Notification.requestPermission(function (permission) {
    // If the user accepts, let's create a notification
    // if (permission === "granted") {
    //     var notification = new Notification("Hi there!");
    // }
});


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
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
    var latLng = new google.maps.LatLng(coords.lat, coords.lng);

    if (pos.dataset.coords === j(coords)) {
        return;
    }

    var notification = new Notification("Location changed");

    pos.dataset.coords = j(coords);
    if (marker) {
        marker.setPosition(latLng);
        map.panTo(latLng);
    } else {
        marker = new google.maps.Marker({
            position: latLng,
            map: map,
            animation: google.maps.Animation.BOUNCE
        });
        map.panTo(latLng);
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

navigator.serviceWorker.register('sw.js').then(function (x) {
    console.log('done', x);
});