let map = L.map('map').setView([17.360589, 78.4740613], 13); // Default location (Hyderabad)

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to search location
function searchLocation() {
    let searchBox = document.getElementById('search-box').value;
    if (!searchBox) return alert('Please enter a location!');

    let url = `https://nominatim.openstreetmap.org/search?format=json&q=${searchBox}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let lat = parseFloat(data[0].lat);
                let lon = parseFloat(data[0].lon);
                map.setView([lat, lon], 14);
                L.marker([lat, lon]).addTo(map).bindPopup(searchBox).openPopup();
            } else {
                alert('Location not found!');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to get current location
function locateCurrentLocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            map.setView([lat, lon], 14);
            L.marker([lat, lon]).addTo(map).bindPopup('You are here').openPopup();
        },
        (error) => alert('Unable to retrieve location!')
    );
}

