document.addEventListener("DOMContentLoaded", function () {
    let map = L.map("map").setView([20, 78], 5); // Centered in India
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    let searchInput = document.getElementById("search");
    let saveButton = document.getElementById("save-btn");
    let savedList = document.getElementById("saved-list");
    let recentList = document.getElementById("recent-list");

    let savedLocations = [];
    let recentLocations = [];
    let currentLocation = null;

    searchInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter" && searchInput.value.trim() !== "") {
            let locationName = searchInput.value;

            fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length > 0) {
                        let coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];

                        L.marker(coords).addTo(map).bindPopup(locationName).openPopup();
                        map.setView(coords, 12);

                        currentLocation = { name: locationName, coords };

                        recentLocations.unshift(currentLocation);
                        if (recentLocations.length > 5) recentLocations.pop();
                        updateRecentList();

                        searchInput.value = "";
                    } else {
                        alert("Location not found. Try again.");
                    }
                })
                .catch(error => {
                    console.error("Error fetching location:", error);
                    alert("Error finding location.");
                });
        }
    });

    saveButton.addEventListener("click", function () {
        if (currentLocation) {
            savedLocations.push(currentLocation);
            updateSavedList();
            alert("Location saved!");
        }
    });

    function updateRecentList() {
        recentList.innerHTML = "";
        recentLocations.forEach(loc => {
            let li = document.createElement("li");
            li.innerHTML = `<i class="fas fa-clock"></i> ${loc.name}`;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => map.setView(loc.coords, 12));
            recentList.appendChild(li);
        });
    }

    function updateSavedList() {
        savedList.innerHTML = "";
        savedLocations.forEach(loc => {
            let li = document.createElement("li");
            li.innerHTML = `<i class="fas fa-bookmark"></i> ${loc.name}`;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => map.setView(loc.coords, 12));
            savedList.appendChild(li);
        });
    }
});
