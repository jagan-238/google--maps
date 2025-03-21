let map;
let routingControl;
let savedLocations = [];
let selectedType = null;
let speechSynthesisUtterance = null;
let audioQueue = [];

function initMap() {
    map = L.map('map').setView([17.3850, 78.4867], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', function(event) {
        if (selectedType) {
            document.getElementById(selectedType).innerHTML = 
                `${selectedType === "start" ? "Start" : "End"}: (${event.latlng.lat.toFixed(4)}, ${event.latlng.lng.toFixed(4)}) 
                 <span class="small-btn" onclick="selectLocation('${selectedType}')">📍 Set</span>`;
            
            saveLocation(event.latlng, selectedType);
            selectedType = null;
        }
    });
}

function selectLocation(type) {
    selectedType = type;
    alert(`Click on the map to set the ${type === "start" ? "start" : "destination"} location.`);
}

function saveLocation(latLng, type) {
    savedLocations = savedLocations.filter(loc => loc.type !== type);
    savedLocations.push({ latLng, type });
}

function calculateRoute() {
    let start = savedLocations.find(loc => loc.type === "start");
    let end = savedLocations.find(loc => loc.type === "end");

    if (!start || !end) {
        alert("Please select both start and end locations.");
        return;
    }

    if (routingControl) {
        map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(start.latLng.lat, start.latLng.lng),
            L.latLng(end.latLng.lat, end.latLng.lng)
        ],
        routeWhileDragging: true,
        lineOptions: {
            styles: [{ color: 'red', weight: 6 }]  // 🔴 Route in Red
        },
        createMarker: function(i, waypoint, n) {
            let icon = i === 0 ? '🔴' : i === n - 1 ? '🔵' : '⚪';
            return L.marker(waypoint.latLng, {
                icon: L.divIcon({ className: 'custom-icon', html: icon, iconSize: [20, 20] })
            });
        }
    }).addTo(map);

    routingControl.on('routesfound', function(e) {
        let instructions = e.routes[0].instructions;
        prepareAudioQueue(instructions);
    });
}

function prepareAudioQueue(instructions) {
    audioQueue = [];

    instructions.forEach((step) => {
        let originalText = step.text; // Use full step text
        audioQueue.push(originalText);
    });

    console.log("Audio Queue:", audioQueue);
}

function startAudio() {
    if (audioQueue.length === 0) {
        alert("No route found! Click 'Find Route' first.");
        return;
    }
    playAudioQueue(audioQueue);
}

function playAudioQueue(queue) {
    if (queue.length === 0) return;

    speechSynthesisUtterance = new SpeechSynthesisUtterance();
    speechSynthesisUtterance.text = queue.shift();
    speechSynthesisUtterance.lang = "en-US";
    
    speechSynthesisUtterance.onend = () => playAudioQueue(queue);
    
    window.speechSynthesis.speak(speechSynthesisUtterance);
}

function stopAudio() {
    if (speechSynthesisUtterance) {
        window.speechSynthesis.cancel();
    }
}

function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    savedLocations = [];
    document.getElementById("start").innerHTML = 'Start: <span class="small-btn">📍 Set</span>';
    document.getElementById("end").innerHTML = 'End: <span class="small-btn">📍 Set</span>';
    stopAudio();
}

initMap();


