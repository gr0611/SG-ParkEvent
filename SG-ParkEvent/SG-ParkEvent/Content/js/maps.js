function initialiser() {
  console.log("INITIALISATION EN COURS .... VUEILLEZ PATIENTEZ ... BIP TUTUTUTU GRRRRRR ")
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var map = new google.maps.Map(document.getElementById('map'), {
    mapTypeControl: false,
    zoom: 12,
    center: {
      lat: 48.1119800,
      lng: -1.6742900
    }
  });

  directionsDisplay.setMap(map);
  // Create an array of alphabetical characters used to label the markers.
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.

  const apiUrl = "http://data.citedia.com/r1/parks/?crs=EPSG:4326";

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
    parks.forEach(function(park) {
      var geo = null;
      features.forEach(function(feature) {
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
  //var locations = getParks();
  var locations = []
  event = getEventId($("#modal1").attr("data-id"));
  var myLatLng = new google.maps.LatLng(event.Latitude, event.Longitude);
  var markerEvent = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: event["Nom"]
  });

  items = getParks();

  // Tri parking


  function getDistanceInKm(start, end) {
    var distance = google.maps.geometry.spherical.computeDistanceBetween(start, end);
    console.log("DISTANCE", distance)
    return distance;
  }

  items.forEach(function(item) {
    var ParkLatLng = new google.maps.LatLng(item.coordinatesLat, item.coordinatesLng)
    item.distance = getDistanceInKm(myLatLng, ParkLatLng)

    /*
    locations.push({
      lat: item.coordinatesLat,
      lng: item.coordinatesLng
    })
    */
  })

  // on a la distance entre l'évent et tout les parkings, on va les trier et récupérer les 3 premiers
  locations = items.sort((a, b) => (a.distance) > (b.distance)).slice(0, 3);
  console.log("APRES LE TRI", locations)

  var markers = locations.map(function(location, i) {
    return new google.maps.Marker({
      position: {
        lat: location.coordinatesLat,
        lng: location.coordinatesLng
      },
      label: labels[i % labels.length]
    });
  });


  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers, {
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
  //new AutocompleteDirectionsHandler(map);

  var input = /** @type {!HTMLInputElement} */ (document.getElementById('pac-input'));

  var types = document.getElementById('type-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

  autocomplete.addListener('place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = this.getPlace();
    calculateAndDisplayRoute(directionsService, directionsDisplay, place);

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17); // Why 17? Because it looks good.
    }
    marker.setIcon( /** @type {google.maps.Icon} */ ({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

  //Affichage des trois parkings
  var maps = urlToJson();
  var parks = maps.parks;

  parks.forEach(function(park, i) {
    var infoParkings = getInfoPark(park.parkInformation.name);
    console.log("info", infoParkings)

    var html = `<img src="/Content/Image/parking.jpg" alt="parking" class="circle">
                <span class="title">${park.parkInformation.name}</span>
                <p>
                    Nombre de places totales : ${park.parkInformation.max}<br>
                    Nombre de places libres: ${park.parkInformation.free} <br>
                    <h5>Tarif en vigueur dans le parking</h5>
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

  // Sets a listener on a radio button to change the filter type on Places
  // Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    radioButton.addEventListener('click', function() {
      autocomplete.setTypes(types);
    });
  }

  function calculateAndDisplayRoute(directionsService, directionsDisplay, place) {
    var input = /** @type {!HTMLInputElement} */ (
      document.getElementById('pac-input'));
    var autocomplete = new google.maps.places.Autocomplete(input);
    console.log("place", place);
    var end = myLatLng;
    directionsService.route({
      origin: place.geometry.location,
      destination: end,
      travelMode: 'DRIVING'
    }, function(response, status) {
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
    xmlhttp.onreadystatechange = function() {
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
    xmlhttp.onreadystatechange = function() {
      parking = JSON.parse(xmlhttp.responseText);
    };
    xmlhttp.send(null);

    return parking;
  }

}


/********************************************/