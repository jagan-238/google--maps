let map;
let searchMarker;
let routeControl;
let currentLocation = [17.385044, 78.486671];
let currentUserLocation = null; 

// Initialize Leaflet map
function initMap() {
    map = L.map('map').setView(currentLocation, 12);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Create a default marker at current location
    searchMarker = L.marker(currentLocation).addTo(map);
}

function searchLocation() {
    const location = document.getElementById("search-box").value.trim();
    if (!location) return alert("Please enter a location!");

    // Use Nominatim API to search location
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) return alert("Location not found!");

            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);

            // Move map to the new location and add a marker
            map.setView([lat, lon], 14);
            if (searchMarker) {
                searchMarker.setLatLng([lat, lon]);
            } else {
                searchMarker = L.marker([lat, lon]).addTo(map);
            }

            searchMarker.bindPopup(`Location: ${data[0].display_name}`).openPopup();
        })
        .catch(err => alert("Error while searching location!"));
}

function getDirections() {
    const start = document.getElementById("search-box").value.trim();
    if (!start) return alert("Please enter a start location!");

    // Fetch destination from a predefined location (Kadapa for example)
    const end = "Kadapa, Andhra Pradesh";

    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`)
        .then(response => response.json())
        .then(startData => {
            if (startData.length === 0) return alert("Start location not found!");

            const startLat = parseFloat(startData[0].lat);
            const startLon = parseFloat(startData[0].lon);

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`)
                .then(response => response.json())
                .then(endData => {
                    if (endData.length === 0) return alert("End location not found!");

                    const endLat = parseFloat(endData[0].lat);
                    const endLon = parseFloat(endData[0].lon);

                    // Add route using Leaflet Routing Machine
                    if (routeControl) {
                        routeControl.remove();
                    }
                    routeControl = L.Routing.control({
                        waypoints: [
                            L.latLng(startLat, startLon),
                            L.latLng(endLat, endLon)
                        ],
                        routeWhileDragging: true
                    }).addTo(map);
                })
                .catch(err => alert("Error fetching destination!"));
        })
        .catch(err => alert("Error fetching start location!"));
}

function locateCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            currentUserLocation = [position.coords.latitude, position.coords.longitude];
            map.setView(currentUserLocation, 14);
            L.marker(currentUserLocation).addTo(map)
                .bindPopup("You are here!").openPopup();
        }, () => alert("Unable to get current location!"));
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Initialize map on page load
window.onload = initMap;
