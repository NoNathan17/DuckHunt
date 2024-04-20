document.getElementById("travelForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const destination = document.getElementById("destination").value;
    fetch(`https://api.travel-advisor.p.rapidapi.com/locations/search?query=${destination}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "YOUR_API_KEY",
            "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        const locationId = data.data[0].result_object.location_id;
        return fetch(`https://api.travel-advisor.p.rapidapi.com/attractions/list?location_id=${locationId}&currency=USD&lang=en_US`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "YOUR_API_KEY",
                "x-rapidapi-host": "travel-advisor.p.rapidapi.com"
            }
        });
    })
    .then(response => response.json())
    .then(data => {
        const attractions = data.data;
        const itineraryContent = document.getElementById("itineraryContent");
        itineraryContent.innerHTML = "";
        attractions.forEach(attraction => {
            const attractionName = attraction.name;
            const attractionAddress = attraction.address;
            const attractionDescription = attraction.description;
            const p = document.createElement("p");
            p.innerHTML = `<strong>${attractionName}</strong><br>${attractionAddress}<br>${attractionDescription}`;
            itineraryContent.appendChild(p);
        });
        document.getElementById("itinerary").classList.remove("hidden");
    })
    .catch(err => {
        console.error(err);
        alert("An error occurred. Please try again later.");
    });
});
