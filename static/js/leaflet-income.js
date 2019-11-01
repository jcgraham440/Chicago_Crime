// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
// var myMap = L.map("map").setView([37.09, -87.71], 4);
var myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 11,
    preferCanvas: true
  });
  
  
  // Add a tile layer (the background map image) to our map
  // Use the addTo method to add objects to our map
    // id: "mapbox.streets",
    // id: "mapbox.light",
    // id: "mapbox.dark",
    // id: "mapbox.satellite",
    // id: "mapbox.streets-satellite",
    // id: "mapbox.wheatpaste",
    // id: "mapbox.streets-basic",
    // id: "mapbox.comic",
    // id: "mapbox.outdoors", //# this one has transportation and highway
    // id: "mapbox.run-bike-hike", //# this one is good
    // id: "mapbox.pencil",
    // id: "mapbox.pirates",
    // id: "mapbox.emerald", // this one has transportation
    // id: "mapbox.high-contrast", //this one has highway
  
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.run-bike-hike", 
    updateWhenZooming: false,
    updateWhenIdle: true,
    accessToken: API_KEY
  
    // L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    // maxZoom: 18,
    // id: "mapbox.dark",
    // updateWhenZooming: false,
    // updateWhenIdle: true,
    // accessToken: API_KEY
  
  
  
  
  
  
  }).addTo(myMap);
  
  
  
  // // var incomePerLocation = "Income_per_location.csv"
  // d3.csv("Income_per_location.csv", function(d) {
  //       console.log ("Test", d)
  // // Create a rectangle and pass in some initial options
  // L.rectangle([
  //   [41.80752727, -87.67344871],
  // ], {
  //   color: "black",
  //   weight: 3,
  //   stroke: true
  // }).addTo(myMap);
  
  
  // })
  
  
  // // Census Tract Geojson//
  // var queryUrl = "Boundaries - Census Tracts - 2010.geojson";
  // d3.json(queryUrl, function(data) {
  // console.log ("Census", data)
  // });
  
  
  // //Cluster by crime type
  // d3.csv("total_cluster_df.csv", function(clusterData) {
  //   console.log ("clusterData", clusterData)
  //   var cluster = clusterData
    
  
  // for (var i = 0; i < cluster.length; i++) {
  //   var CrimeType = cluster[i];
  //   L.marker(CrimeType.location)
  //     .bindPopup("<h1>" + CrimeType.name + "</h1> <hr> <h3>Population " + CrimeType.population + "</h3>")
  //     .addTo(myMap);
  // }
  // });
  
    // https://leafletjs.com/examples/choropleth/
    // http://colorbrewer2.org/#type=sequential&scheme=Greens&n=6
    // function getColor(d) {
    //   return d > 5  ? '#bd0026' :
    //          d > 4  ? '#f03b20' :
    //          d > 3  ? '#fd8d3c' :
    //          d > 2  ? '#feb24c' :
    //          d > 1  ? '#fed976' :
    //                   '#c7e9c0';
    // }
  
  
  
  // Step 3:Perform a GET request to the query URL
  // d3.json(queryUrl, function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    // console.log("queryurlData", data)
  
  
    // Loop through the cities array and create one marker for each city object
      // for (var i = 0; i < data.features.length; i++) {
      //     var coordinates = data.features[i].geometry.coordinates;
      //     var magnitutde = data.features[i].properties.mag;
      //     var location = data.features[i].properties.place;
      //     var event_date = new Date(data.features[i].properties.time);
      //     L.circle([coordinates[1],coordinates[0]],{
      //         fillColor: getColor(magnitutde),
      //         weight: 2, 
      //         opacity: 1,
      //         color: getColor(magnitutde),
      //         fillOpacity: 0.7,
              
  
              // Setting our circle's radius equal to the output of our markerSize function
              // This will make our marker's size proportionate to its population
              // radius: magnitutde * 29000,
              
              // radius: markerSize(data[i].features)
  //         }).bindPopup("<h3>" + location + "</h3><hr><h3> Magnitude: " + magnitutde + "</h5>" + "<p>" + event_date + "</p>") // Add tooltip
  //         .addTo(myMap);
  //     };
  // })
  
  
  
  // var legend = L.control({position: 'bottomright'});
  
  // legend.onAdd = function (map) {
  
  // 	var div = L.DomUtil.create('div', 'legend'),
  // 		color = [0,1,2,3,4,5],
  // 		labels = [];
  
  // 	// loop through our density intervals and generate a label with a colored square for each interval
  // 	for (var i = 0; i < color.length; i++) {
  // 		div.innerHTML +=
  // 			'<i style="background:' + getColor(color[i] + 1) + '"></i> ' +
  // 			color[i] + (color[i + 1] ? '&ndash;' + color[i + 1] + '<br>' : '+');
  // 	}
  
  // 	return div;
  // };
  
  // legend.addTo(myMap);