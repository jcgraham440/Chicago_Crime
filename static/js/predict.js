var myMap = L.map("container", {
  center: [41.8781, -87.6298],
  zoom: 11,
  preferCanvas: true
});


console.log("adding tileLayer()...")
// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      updateWhenZooming: false,
      updateWhenIdle: true,
      accessToken: API_KEY
}).addTo(myMap);

// Retrieve data from the database
d3.json(`/clusters`).then(function(response) {
   
      // Create a new marker cluster group
      var markers = L.markerClusterGroup();
      console.log("looping through the data...");
      console.log(response)
      // Loop through data
      for (var i = 0; i <= response.length; i++) {
	        // Add a new marker to the cluster group and bind a pop-up
	       markers.addLayer(L.marker([response.Latitude[i], response.Longitude[i]])
	                        .bindPopup(response.Crime_type[i]));
      }
      // Add our marker cluster layer to the map
      myMap.addLayer(markers);
});