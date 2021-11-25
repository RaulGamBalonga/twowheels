// main.js

window.onload = () => {
    const ironhackBCN = {
        lat: 41.386230,
        lng: 2.174980
    };

    const markers = []

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: ironhackBCN
    });

    let center = {
        lat: undefined,
        lng: undefined
    };

    getItineraries(map)
        .then(itineraries => {
            // 7. Instrucciones: Llamar a placeRestaurants pasandoles la info
            const markers = placeItineraries(map, itineraries)
        })
        .catch(error => console.log(error))


    // public/javascripts/main.js

    function getItineraries() {
        axios.get("/itineraries/api")
            .then(response => {
                placeItineraries(response.data.itineraries);
            })
            .catch(error => {
                console.log(error);
            })
    }

    // 6. Instrucciones: Creado y llamado a getRestaurants para recuperar
    //    esa info de la BD
    function getItineraries() {
        return axios.get("/restaurants/api")
            .then(response => response.data.itineraries)
    }



    function placeRestaurants(map, restaurants) {
        const markers = []

        // 8. Instrucciones: Por cada restaurante creo un nuevo Marker
        restaurants.forEach((restaurant) => {
            const center = {
                lat: restaurant.location.coordinates[1],
                lng: restaurant.location.coordinates[0]
            };
            const newMarker = new google.maps.Marker({
                position: center,
                map: map,
                title: restaurant.name
            });
            markers.push(newMarker);
        });

        // 9. Instrucciones: Finalmente retorno los markers por si los necesitase a futuro
        return markers

};


