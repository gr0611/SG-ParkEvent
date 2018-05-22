function initialiser() {
  var directionsDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map = new google.maps.Map(document.getElementById('map'), {
           mapTypeControl: false,
           zoom: 12,
           center: {lat: 48.1119800, lng: -1.6742900}
         });


 // Create an array of alphabetical characters used to label the markers.
 var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

 // Add some markers to the map.
 // Note: The code uses the JavaScript Array.prototype.map() method to
 // create an array of markers based on a given "locations" array.
 // The map() method here has nothing to do with the Google Maps API.

const apiUrl = "http://data.citedia.com/r1/parks/?crs=EPSG:4326";

function urlToJson() {
  var HttpReq = new XMLHttpRequest();
  HttpReq.open("GET",apiUrl,false);
  HttpReq.send(null);
  return JSON.parse(HttpReq.responseText);
}


function getParks(){
  var maps = urlToJson();
  var parks = maps.parks;
  var features = maps.features.features;
  var customParks = [];
  //var lat =null;
  //var lng = null;
  parks.forEach(function(park){
    var geo = null;
      features.forEach(function(feature){
        if(park.id == feature.id){
            geo = feature.geometry.coordinates;
          }
      })
      customParks.push({
        name: park.parkInformation && park.parkInformation.name,
        status: park.parkInformation && park.parkInformation.status,
        max: park.parkInformation &&  park.parkInformation.max,
        free: park.parkInformation &&  park.parkInformation.free,
        id: park.parkInformation && park.id,
        coordinatesLat : geo[1],
        coordinatesLng : geo[0],
      })
  })
  return customParks;
}
//var locations = getParks();
var locations = []
event = getEventId($("#modal1").attr("data-id"));
var myLatLng = { lat: event["Latitude"], lng: event["Longitude"] }
var markerEvent = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: event["Nom"]
});

items = getParks();

items.forEach(function(item){
   locations.push({
     lat:item.coordinatesLat, lng: item.coordinatesLng
   })
})
var markers = locations.map(function(location, i) {
   return new google.maps.Marker({
     position: location,
     label: labels[i % labels.length]
   });
});


  // Add a marker clusterer to manage the markers.
  var markerCluster = new MarkerClusterer(map, markers,
     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
//new AutocompleteDirectionsHandler(map);

var input = /** @type {!HTMLInputElement} */(document.getElementById('pac-input'));

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
         var place = autocomplete.getPlace();
         if (!place.geometry) {
           // User entered the name of a Place that was not suggested and
           // pressed the Enter key, or the Place Details request failed.
           window.alert("No details available for input: '" + place.name + "'");
           return;
         }

         // If the place has a geometry, then present it on a map.
         if (place.geometry.viewport) {
           map.fitBounds(place.geometry.viewport);
         } else {
           map.setCenter(place.geometry.location);
           map.setZoom(17);  // Why 17? Because it looks good.
         }
         marker.setIcon(/** @type {google.maps.Icon} */({
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

       // Sets a listener on a radio button to change the filter type on Places
       // Autocomplete.
       function setupClickListener(id, types) {
         var radioButton = document.getElementById(id);
         radioButton.addEventListener('click', function() {
           autocomplete.setTypes(types);
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

    //// Montrer les 3 parkings les plus proches
    //   function getClosestParkings() {
    //       var parkingLat = null;
    //       var parkingLng = null;
    //       var eventLat = null;
    //       var eventLng = null;
    //       var distance = null;
    //   }
}


//APIKEY = AIzaSyAiUoBBAdg7beOlYsRuJsGO2vD0yZBa78Y
/********************************************/
