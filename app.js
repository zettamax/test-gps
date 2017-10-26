var x = document.querySelector("#demo");
var geoOptions = {
    maximumAge: 10000,
    enableHighAccuracy: true
};
var j = JSON.stringify;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (p) {
            showPosition(p, '0a0');
        }, errorPosition, geoOptions);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position, color) {

    var coords = j({
        lat: position.coords.latitude,
        lon: position.coords.longitude
    });

    if (x.dataset.coords === coords) {
        return;
    }
    x.dataset.coords = coords;

    x.innerHTML +=
        "<div class='loc' style='position: absolute;'>" +
        "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude + '</div>';

    var loc = document.querySelector('.loc:not(:first-child)');
    x.removeChild(loc);
}
function errorPosition(e) {
    console.log(e);
}
