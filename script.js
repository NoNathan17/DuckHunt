document.getElementById("travelForm").addEventListener("submit", function(event) {
    event.preventDefault();
    document.getElementById("loading-message").classList.remove("hidden")

    const destination = document.getElementById("destination").value;
    fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${destination}&limit=30&offset=0&units=mi&location_id=1&currency=USD&sort=relevance&lang=en_US`, {
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
        return fetch(`https://travel-advisor.p.rapidapi.com/attractions/list?location_id=${locationId}&currency=USD&lang=en_US&lunit=mi&limit=5&sort=reccomended`, {
            "method": "GET",
            "headers": {
                "X-RapidAPI-key": "f87fe54ac5msh3f62659484924a8p14a7e4jsnb2cc27d65afb",
                "X-RapidAPI-host": "travel-advisor.p.rapidapi.com"
            }
        });
    })
    .then(response => {
        document.getElementById("loading-message").classList.add("hidden");
        return response.json();
    })
    .then(data => {
        console.log(data)
        const attractions = data.data;
        const itineraryContent = document.getElementById("itineraryContent");
        itineraryContent.innerHTML = "";
        attractions.forEach(attraction => {
            const attractionName = attraction.name;
            const attractionAddress = attraction.address;
            const attractionDescription = attraction.description;
            const attractionPhotoURL = attraction.photo?.images?.original?.url;

            const attractionDiv = document.createElement("div")
            attractionDiv.classList.add('attraction')

            const headerElement = document.createElement("h2")
            headerElement.classList.add("attraction-header")
            headerElement.textContent = attractionName

            const addressElement = document.createElement("div")
            addressElement.classList.add("attraction-address")
            addressElement.textContent = attractionAddress

            const descriptionElement = document.createElement("p")
            descriptionElement.classList.add("attraction-description")
            descriptionElement.textContent = attractionDescription

            attractionDiv.appendChild(headerElement)
            attractionDiv.appendChild(addressElement)
            attractionDiv.appendChild(descriptionElement)

            if (attractionPhotoURL) { 
                const imageElement = document.createElement("img");
                imageElement.classList.add("attraction-image");
                imageElement.src = attractionPhotoURL;
                attractionDiv.appendChild(imageElement);
            } else {
                const noImageElement = document.createElement("p");
                noImageElement.textContent = "No image available";
                attractionDiv.appendChild(noImageElement);
            }

            itineraryContent.appendChild(attractionDiv)
        });
        document.getElementById("itinerary").classList.remove("hidden");
    })
    .catch(err => {
        console.error(err);
        alert("An error occurred. Please try again later.");
    });
});
