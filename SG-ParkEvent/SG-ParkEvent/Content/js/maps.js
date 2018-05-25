function initialiser() {
    console.log("INITIALISATION EN COURS .... VUEILLEZ PATIENTEZ ... BIP TUTUTUTU GRRRRRR ")
    const apiUrl = "http://data.citedia.com/r1/parks/?crs=EPSG:4326";
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    event = getEventId($("#modal1").attr("data-id"));
    var myLatLng = new google.maps.LatLng(event.Latitude, event.Longitude);
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        mapTypeControl: false,
        zoom: 13,
        center: myLatLng
    });

    directionsDisplay.setMap(map);
    // Create an array of alphabetical characters used to label the markers.


    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    // Traitement principal
    var origin = null;
    var locations = []
    
    
    var markerEvent = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: event["Nom"]
    });

    items = getClosestParking(getParks());
    AddMarkers(items);
    displayParkingInfo(items);

    


    function urlToJson() {
        var HttpReq = new XMLHttpRequest();
        HttpReq.open("GET", apiUrl, false);
        HttpReq.send(null);
        return JSON.parse(HttpReq.responseText);
    }


    function getParks() {
        var maps = urlToJson();
        var parks = maps.parks;
        var features = maps.features.features;
        var customParks = [];
        //var lat =null;
        //var lng = null;
        parks.forEach(function (park) {
            var geo = null;
            features.forEach(function (feature) {
                if (park.id == feature.id) {
                    geo = feature.geometry.coordinates;
                }
            })
            customParks.push({
                name: park.parkInformation && park.parkInformation.name,
                status: park.parkInformation && park.parkInformation.status,
                max: park.parkInformation && park.parkInformation.max,
                free: park.parkInformation && park.parkInformation.free,
                id: park.parkInformation && park.id,
                coordinatesLat: geo[1],
                coordinatesLng: geo[0],
            })
        })
        return customParks;
    }


    function getDistanceInKm(start, end) {
        var distance = google.maps.geometry.spherical.computeDistanceBetween(start, end);
        console.log("DISTANCE", distance)
        return distance;
    }
    // RÈcupÈration des 3 parkings
    function getClosestParking(items) {
        items.forEach(function (item) {
            var ParkLatLng = new google.maps.LatLng(item.coordinatesLat, item.coordinatesLng)
            item.distance = getDistanceInKm(myLatLng, ParkLatLng)
        })
        return items.sort((a, b) => (a.distance) > (b.distance)).slice(0, 3);
    }



    // on a la distance entre l'√©vent et tout les parkings, on va les trier et r√©cup√©rer les 3 premiers
    function AddMarkers(items) {
        const markers = [];
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        items.forEach(function(item, i){
            const position =  {
                lat: item.coordinatesLat,
                lng: item.coordinatesLng
            };
            const marker = new google.maps.Marker({
                position,
                map,
                icon: iconBase + 'parking_lot_maps.png',
                label: labels[i % labels.length],
                title: item.name
            });
            google.maps.event.addListener(marker,'click',function() {
                const myParkLatLng = marker.position;
                calculateAndDisplayRoute(directionsService, directionsDisplay, myParkLatLng);
            });
            markers.push(marker);
        });
        var markerCluster = new MarkerClusterer(map, markers, {
            imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
        });
    }

    // Add a marker clusterer to manage the markers.

    //new AutocompleteDirectionsHandler(map);

    var input = /** @type {!HTMLInputElement} */ (document.getElementById('pac-input'));

    //var types = document.getElementById('type-selector');
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29),
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        origin = this.getPlace();
        calculateAndDisplayRoute(directionsService, directionsDisplay, myLatLng);

        // If the place has a geometry, then present it on a map.
        if (origin.geometry.viewport) {
            map.fitBounds(origin.geometry.viewport);
        } else {
            map.setCenter(origin.geometry.location);
            map.setZoom(17); // Why 17? Because it looks good.
        }
        marker.setIcon( /** @type {google.maps.Icon} */({
            url: origin.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(origin.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (origin.address_components) {
            address = [
              (origin.address_components[0] && origin.address_components[0].short_name || ''),
              (origin.address_components[1] && origin.address_components[1].short_name || ''),
              (origin.address_components[2] && origin.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + origin.name + '</strong><br>' + address);
        infowindow.open(map, marker);
    });

    //Affichage des trois parkings

    function displayParkingInfo(parks) {
        parks.forEach(function (park, i) {
            console.log("park", park);
            var infoParkings = getInfoPark(park.name);
            console.log("info", infoParkings)

            var html = `<img src="/Content/Image/parking.jpg" alt="parking" class="circle">
                <h3 class="title">${park.name}</h3>
                <p>
                    Nombre de places totales : ${park.max}<br>
                    Nombre de places libres: ${park.free} <br>
                    <strong>Estimations de tarifs dans le parking en journee</strong>
                    <ul>
                    <li>Affichage tarif 15min: ${infoParkings.records[0] && infoParkings.records[0].fields.tarif_15} Euros pour 15 minutes</li>
                    <li>Affichage tarif 30min: ${infoParkings.records[0] && infoParkings.records[0].fields.tarif_30} Euros pour 30 minutes</li>
                    <li>Affichage tarif 1h: ${infoParkings.records[0] && infoParkings.records[0].fields.tarif_1h} Euros pour une heure</li>
                    <li>Affichage tarif 1h30: ${infoParkings.records[0] && infoParkings.records[0].fields.tarif_1h30} Euros pour une heure et demi</li>
                    <li>Affichage tarif 2h: ${infoParkings.records[0] && infoParkings.records[0].fields.tarif_2h} Euros pour deux heures</li>
                    <li>Affichage tarif 3h: ${infoParkings.records[0] && infoParkings.records[0].fields.tarif_3h} Euros pour trois heures</li>
                    <li>Affichage tarif 4h: ${infoParkings.records[0] && infoParkings.records[0].fields.tarif_4h} Euros pour quatre heures</li>
                    </ul>
                </p>`
            $(".avatar:eq(" + i + ")").html(html);
        })
    }

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
        var radioButton = document.getElementById(id);
        radioButton.addEventListener('click', function () {
            autocomplete.setTypes(types);
        });
    }

    function calculateAndDisplayRoute(directionsService, directionsDisplay, end) {
        var input = /** @type {!HTMLInputElement} */ (
          document.getElementById('pac-input'));
        var autocomplete = new google.maps.places.Autocomplete(input);
        console.log("origin", origin);
        directionsService.route({
            origin: origin.geometry.location,
            destination: end,
            travelMode: 'DRIVING'
        }, function (response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    }


    //var depart = null;
    //var arrivee = null;
    //var distance = google.maps.geometry.spherical.computeDistanceBetween( depart, arrivee )

    function getEventId(id) {
        var event = {};
        var xmlhttp = new XMLHttpRequest();
        var url = window.location.origin + "/Evenements/GetEventsDataById/" + id;
        xmlhttp.open("GET", url, false);
        xmlhttp.onreadystatechange = function () {
            event = JSON.parse(xmlhttp.responseText);
        };
        xmlhttp.send(null);

        return event;
    }

    function getInfoPark(key) {
        var parking = {};
        var xmlhttp = new XMLHttpRequest();
        //console.log(key);
        var url = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=export-api-parking-citedia&q=key:" + key;
        xmlhttp.open("GET", url, false);
        xmlhttp.onreadystatechange = function () {
            parking = JSON.parse(xmlhttp.responseText);
        };
        xmlhttp.send(null);

        return parking;
    }

}


/********************************************/