var pos = document.querySelector("#pos");
var log = document.querySelector("#log");
var geoOptions = {
    maximumAge: 10000,
    enableHighAccuracy: true
};
var j = JSON.stringify;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(showPosition, errorPosition, geoOptions);
    } else {
        pos.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position, color) {

    var coords = j({
        lat: position.coords.latitude,
        lon: position.coords.longitude
    });
    var dumpCoords = pos.dataset.coords;

    if (pos.dataset.coords === coords) {
        return;
    }
    pos.dataset.coords = coords;

    var lastLoc = pos.querySelector('.loc:first-child');
    if (lastLoc) {
        var firstLog = log.querySelector('.loc:first-child');
        log.insertBefore(lastLoc, firstLog);

        document.querySelector('#pre').innerText = dumpCoords + '\n' + pos.dataset.coords;
    }

    pos.innerHTML =
        "<div class='loc'>" +
        "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude + '</div>';

}
function errorPosition(e) {
    console.log(e);
}
