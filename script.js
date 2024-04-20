document.getElementById("travelForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const destination = document.getElementById("destination").value;
    fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${destination}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US`, {
        "method": "GET",
        "headers": {
            "X-RapidAPI-key": "f87fe54ac5msh3f62659484924a8p14a7e4jsnb2cc27d65afb",
            "X-RapidAPI-host": "travel-advisor.p.rapidapi.com"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const locationId = data.data[0].result_object.location_id;
        return fetch(`https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${locationId}&currency=USD&lang=en_US&lunit=mi&sort=recommended`, {
            "method": "GET",
            "headers": {
                "X-RapidAPI-key": "f87fe54ac5msh3f62659484924a8p14a7e4jsnb2cc27d65afb",
                "X-RapidAPI-host": "travel-advisor.p.rapidapi.com"
            }
        });
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
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
