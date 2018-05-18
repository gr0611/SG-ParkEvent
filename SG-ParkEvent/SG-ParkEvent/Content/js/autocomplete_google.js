$(document).ready(function () {
    google.maps.event.addDomListener(window, 'load', function () {
        var places = new google.maps.places.Autocomplete(document.getElementById('txtPlaces'));
        google.maps.event.addListener(places, 'place_changed', function () {
            var place = places.getPlace();
            var address = place.formatted_address;
            var latitude = place.geometry.location.lat;
            var longitude = place.geometry.location.lng;
            var mesg = "Address: " + address;
            mesg += "\nLatitude: " + latitude;
            mesg += "\nLongitude: " + longitude;
            $("#event-lon").val(longitude);
            $("#event-lat").val(latitude);
        });
    });
})