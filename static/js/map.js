// We create the tile layers that will be the selectable backgrounds of our map.
var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.run-bike-hike",
  accessToken: API_KEY
});

// We then create the map object with options. Adding the tile layers we just
// created to an array of layers.
var map = L.map("map", {
  center: [
   41.8781, -87.6298
  ],
  zoom: 11,
  layers: [graymap, outdoors]
});

// Adding our 'graymap' tile layer to the map.
graymap.addTo(map);

// We create the layers for our two different sets of data, 1) clusterpoints and 2)income
var clusterpoints = new L.LayerGroup();
var income = new L.LayerGroup();

// Defining an object that contains all of our different map choices. Only one
// of these maps will be visible at a time!
var baseMaps = {
  "Gray Map": graymap,
  "Colored Map": outdoors
};

// We define an object that contains all of our overlays. Any combination of
// these overlays may be visible at the same time!
var overlays = {
  "Crime Clusters": clusterpoints,
  "Census Income": income
};

// Then we add a control to the map that will allow the user to change which
// layers are visible.
L
  .control
  .layers(baseMaps, overlays)
  .addTo(map);


//---------------------------------Dataset 1) Retrieves 2017 census income geoJSON data.-------------------------//

// Link to GeoJSON
var incomeGeojson = "static/geojsonOutput5.geojson"
var geojson1;

// Grab data with d3
d3.json(incomeGeojson, function(incomeData) {

console.log("Geojson",incomeData)

//   // Create a new choropleth layer
  geojson1 = L.choropleth(incomeData, {
    
    // Define what  property in the features to use
    valueProperty: "Income_per_location_2017_Household_Income_by_Race1",

    // Set color scale
   //  scale: ["#ffffb2", "#b10026"],
   //  scale: ["#FFEDA0", "#a1490a"],
    scale: ["#dccef5", "#321761"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h2>" + "Census Tract number: "+ feature.properties.Income_per_location_2017_Census_Tract_No + "</h2><hr>" + "<h2>"+ "Location:  "  + feature.properties.Income_per_location_2017_County + "," + feature.properties.Income_per_location_2017_State +"</h2>" + "<h2>"+ "Income:  "  + feature.properties.Income_per_location_2017_Household_Income_by_Race2 +"</h2>" );
    }
   // We add the data to the "income" layer instead of directly to the map.
  }).addTo(income);


  
     // Then we add the earthquake layer to our map.
     income.addTo(map);
  });

  
//------------------------------------Cluster Points for Crime Type------------------------------------------//


var blueIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-blue.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var redIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-red.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greenIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-green.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var orangeIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-orange.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var yellowIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-yellow.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var violetIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-violet.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var greyIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-grey.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

var blackIcon = new L.Icon({
	iconUrl: 'static/img/marker-icon-2x-black.png',
	shadowUrl: 'static/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
 

var cluster = [
   {
     "index": "0",
     "Longitude": -87.67344871,
     "Latitude": 41.80752727,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.807526,
        -87.67345
     ]
  },
  {
     "index": 1,
     "Longitude": -87.67382751,
     "Latitude": 42.01264977,
     "Crime_type": "HOMICIDE",
     "Location": [
        42.01265,
        -87.67383
     ]
  },
  {
     "index": 2,
     "Longitude": -87.64092074,
     "Latitude": 41.92972657,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.929726,
        -87.64092
     ]
  },
  {
     "index": 3,
     "Longitude": -87.70614999,
     "Latitude": 41.97256537,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.972565,
        -87.70615
     ]
  },
  {
     "index": 4,
     "Longitude": -87.77311239,
     "Latitude": 41.77783091,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.777832,
        -87.77311
     ]
  },
  {
     "index": 5,
     "Longitude": -87.6579085,
     "Latitude": 41.96608155,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.96608,
        -87.657906
     ]
  },
  {
     "index": 6,
     "Longitude": -87.7108242,
     "Latitude": 41.69800198,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.698,
        -87.71082
     ]
  },
  {
     "index": 7,
     "Longitude": -87.76119564,
     "Latitude": 41.97518547,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.975185,
        -87.76119
     ]
  },
  {
     "index": 8,
     "Longitude": -87.80572224,
     "Latitude": 41.93076129,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.93076,
        -87.805725
     ]
  },
  {
     "index": 9,
     "Longitude": -87.6551644,
     "Latitude": 41.98281871,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.98282,
        -87.65517
     ]
  },
  {
     "index": 10,
     "Longitude": -87.52725823,
     "Latitude": 41.65143133,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.651432,
        -87.52726
     ]
  },
  {
     "index": 11,
     "Longitude": -87.68171857,
     "Latitude": 41.94682308,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.946823,
        -87.68172
     ]
  },
  {
     "index": 12,
     "Longitude": -87.83662354,
     "Latitude": 41.97597841,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.97598,
        -87.836624
     ]
  },
  {
     "index": 13,
     "Longitude": -87.74822428,
     "Latitude": 41.95797427,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.957973,
        -87.74822
     ]
  },
  {
     "index": 14,
     "Longitude": -87.5592994,
     "Latitude": 41.65306216,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.65306,
        -87.559296
     ]
  },
  {
     "index": 15,
     "Longitude": -87.79406942,
     "Latitude": 41.77380925,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.773808,
        -87.79407
     ]
  },
  {
     "index": 16,
     "Longitude": -87.79665486,
     "Latitude": 41.97253017,
     "Crime_type": "HOMICIDE",
     "Location": [
        41.97253,
        -87.79665
     ]
  },
  {
     "index": 17,
     "Longitude": -87.68146105,
     "Latitude": 41.83305635,
     "Crime_type": "ARSON",
     "Location": [
        41.833057,
        -87.68146
     ]
  },
  {
     "index": 18,
     "Longitude": -87.53770167,
     "Latitude": 41.6965688,
     "Crime_type": "ARSON",
     "Location": [
        41.696568,
        -87.537704
     ]
  },
  {
     "index": 19,
     "Longitude": -87.68210301,
     "Latitude": 41.72218499,
     "Crime_type": "ARSON",
     "Location": [
        41.722183,
        -87.682106
     ]
  },
  {
     "index": 20,
     "Longitude": -87.60233216,
     "Latitude": 41.65685118,
     "Crime_type": "ARSON",
     "Location": [
        41.656853,
        -87.60233
     ]
  },
  {
     "index": 21,
     "Longitude": -87.82273723,
     "Latitude": 41.97685876,
     "Crime_type": "ARSON",
     "Location": [
        41.97686,
        -87.82274
     ]
  },
  {
     "index": 22,
     "Longitude": -87.8464671,
     "Latitude": 41.97760948,
     "Crime_type": "ARSON",
     "Location": [
        41.977608,
        -87.846466
     ]
  },
  {
     "index": 23,
     "Longitude": -87.60820349,
     "Latitude": 41.81857481,
     "Crime_type": "ARSON",
     "Location": [
        41.818573,
        -87.6082
     ]
  },
  {
     "index": 24,
     "Longitude": -87.54715888,
     "Latitude": 41.65091053,
     "Crime_type": "ARSON",
     "Location": [
        41.65091,
        -87.54716
     ]
  },
  {
     "index": 25,
     "Longitude": -87.817494,
     "Latitude": 41.99995796,
     "Crime_type": "ARSON",
     "Location": [
        41.999958,
        -87.8175
     ]
  },
  {
     "index": 26,
     "Longitude": -87.69824352,
     "Latitude": 42.01845145,
     "Crime_type": "ARSON",
     "Location": [
        42.01845,
        -87.69824
     ]
  },
  {
     "index": 27,
     "Longitude": -87.74833568,
     "Latitude": 41.99401997,
     "Crime_type": "ARSON",
     "Location": [
        41.99402,
        -87.74834
     ]
  },
  {
     "index": 28,
     "Longitude": -87.74152854,
     "Latitude": 41.75459296,
     "Crime_type": "ARSON",
     "Location": [
        41.754593,
        -87.74153
     ]
  },
  {
     "index": 29,
     "Longitude": -87.87023635,
     "Latitude": 41.9740196,
     "Crime_type": "ARSON",
     "Location": [
        41.97402,
        -87.87024
     ]
  },
  {
     "index": 30,
     "Longitude": -87.70794068,
     "Latitude": 41.68570816,
     "Crime_type": "ARSON",
     "Location": [
        41.685707,
        -87.70794
     ]
  },
  {
     "index": 31,
     "Longitude": -87.57663378,
     "Latitude": 41.69548154,
     "Crime_type": "ARSON",
     "Location": [
        41.69548,
        -87.57664
     ]
  },
  {
     "index": 32,
     "Longitude": -87.58874204,
     "Latitude": 41.799545,
     "Crime_type": "ARSON",
     "Location": [
        41.799545,
        -87.588745
     ]
  },
  {
     "index": 33,
     "Longitude": -87.69089557,
     "Latitude": 41.84474794,
     "Crime_type": "NARCOTICS",
     "Location": [
        41.84475,
        -87.690895
     ]
  },
  {
     "index": 34,
     "Longitude": -87.54230442,
     "Latitude": 41.6532154,
     "Crime_type": "NARCOTICS",
     "Location": [
        41.653214,
        -87.542305
     ]
  },
  {
     "index": 35,
     "Longitude": -87.903496,
     "Latitude": 41.97779052,
     "Crime_type": "NARCOTICS",
     "Location": [
        41.97779,
        -87.903496
     ]
  },
  {
     "index": 36,
     "Longitude": -87.9074726,
     "Latitude": 41.95390047,
     "Crime_type": "NARCOTICS",
     "Location": [
        41.9539,
        -87.90747
     ]
  },
  {
     "index": 37,
     "Longitude": -87.92736489,
     "Latitude": 42.00607411,
     "Crime_type": "NARCOTICS",
     "Location": [
        42.006073,
        -87.92737
     ]
  },
  {
     "index": 38,
     "Longitude": -87.66387908,
     "Latitude": 41.86210201,
     "Crime_type": "THEFT",
     "Location": [
        41.862103,
        -87.66388
     ]
  },
  {
     "index": 39,
     "Longitude": -87.903496,
     "Latitude": 41.97779052,
     "Crime_type": "THEFT",
     "Location": [
        41.97779,
        -87.903496
     ]
  },
  {
     "index": 40,
     "Longitude": -87.93427269,
     "Latitude": 42.00816197,
     "Crime_type": "THEFT",
     "Location": [
        42.008163,
        -87.93427
     ]
  },
  {
     "index": 41,
     "Longitude": -87.66803685,
     "Latitude": 41.83391243,
     "Crime_type": "BATTERY",
     "Location": [
        41.83391,
        -87.66804
     ]
  },
  {
     "index": 42,
     "Longitude": -87.90052009,
     "Latitude": 41.97679965,
     "Crime_type": "BATTERY",
     "Location": [
        41.9768,
        -87.90052
     ]
  },
  {
     "index": 43,
     "Longitude": -91.68656568,
     "Latitude": 36.6194464,
     "Crime_type": "BATTERY",
     "Location": [
        36.619446,
        -91.68657
     ]
  },
  {
     "index": 44,
     "Longitude": -87.91510545,
     "Latitude": 41.95378308,
     "Crime_type": "BATTERY",
     "Location": [
        41.953785,
        -87.91511
     ]
  },
  {
     "index": 45,
     "Longitude": -87.66577898,
     "Latitude": 41.83896798,
     "Crime_type": "ROBBERY",
     "Location": [
        41.838966,
        -87.66578
     ]
  },
  {
     "index": 46,
     "Longitude": -87.78673839,
     "Latitude": 42.0114812,
     "Crime_type": "ROBBERY",
     "Location": [
        42.011482,
        -87.786736
     ]
  },
  {
     "index": 47,
     "Longitude": -87.90389884,
     "Latitude": 41.98078321,
     "Crime_type": "ROBBERY",
     "Location": [
        41.98078,
        -87.9039
     ]
  },
  {
     "index": 48,
     "Longitude": -87.91403057,
     "Latitude": 41.96352938,
     "Crime_type": "ROBBERY",
     "Location": [
        41.963528,
        -87.91403
     ]
  },
  {
     "index": 49,
     "Longitude": -87.66709266,
     "Latitude": 41.83048485,
     "Crime_type": "ASSAULT",
     "Location": [
        41.830486,
        -87.66709
     ]
  },
  {
     "index": 50,
     "Longitude": -87.90178291,
     "Latitude": 41.9771392,
     "Crime_type": "ASSAULT",
     "Location": [
        41.97714,
        -87.90178
     ]
  },
  {
     "index": 51,
     "Longitude": -87.92736489,
     "Latitude": 42.00607411,
     "Crime_type": "ASSAULT",
     "Location": [
        42.006073,
        -87.92737
     ]
  },
  {
     "index": 52,
     "Longitude": -87.89900883,
     "Latitude": 42.00544069,
     "Crime_type": "ASSAULT",
     "Location": [
        42.00544,
        -87.89901
     ]
  },
  {
     "index": 53,
     "Longitude": -87.67873166,
     "Latitude": 41.84739607,
     "Crime_type": "MOTOR VEHICLE THEFT",
     "Location": [
        41.847397,
        -87.678734
     ]
  },
  {
     "index": 54,
     "Longitude": -87.91486972,
     "Latitude": 41.99430053,
     "Crime_type": "MOTOR VEHICLE THEFT",
     "Location": [
        41.9943,
        -87.91487
     ]
  }
 ]

// // Grab data with d3
// d3.json(clusterJson, function(clusterData){
//    console.log ("Cluster Data", clusterData)
   
   
   
var clusterMarkers =[];

for (var i = 0; i < cluster.length; i++) {
   
   
       // Conditionals for countries points
    var color = "";
 
    if (cluster[i].Crime_type === "ARSON") {
      color = orangeIcon;
    }
    else if (cluster[i].Crime_type === "ASSAULT") {
      color = blackIcon;
    }
    else if (cluster[i].Crime_type === "BATTERY") {
      color = greyIcon;
    }
 
    else if (cluster[i].Crime_type === "HOMICIDE") {
     color = redIcon;
   }
 
   else if (cluster[i].Crime_type ==="MOTOR VEHICLE THEFT") {
     color = greenIcon;
   }
 
   else if (cluster[i].Crime_type === "NARCOTICS") {
     color = violetIcon;
   }
 
   else if (cluster[i].Crime_type === "ROBBERY") {
     color = yellowIcon;
   }
 
   else if (cluster[i].Crime_type === "THEFT") {
     color =  blueIcon;
   }
 
    else {
      color =  blueIcon;
    }
 
    // Add circles to map

    L.marker(cluster[i].Location, {icon: color})
    .bindPopup("<h1> Crime Type: " + cluster[i].Crime_type + "</h1> <hr> <h3>Longitude: " + cluster[i].Longitude + " </h3> <h3> Latitude: " + cluster[i].Latitude + "</h3> " )
    .addTo(clusterpoints);
 } 
var cityLayer = L.layerGroup(clusterMarkers);
// Then we add the earthquake layer to our map.
clusterpoints.addTo(map);

var legend = L.control({position: 'topright'});



// -----------------------------------------------------------------------------------Set up the legend---------------------------------------
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML +=  '<img src ="static/img/marker-icon-orange.png">' + ' ARSON' + '<br>'
    div.innerHTML +=  '<img src ="static/img/marker-icon-black.png">' + ' ASSAULT' + '<br>'
    div.innerHTML +=  '<img src ="static/img/marker-icon-grey.png">' + ' BATTERY' + '<br>'
    div.innerHTML +=  '<img src ="static/img/marker-icon-red.png">' + ' HOMICIDE' + '<br>'
    div.innerHTML +=  '<img src ="static/img/marker-icon-green.png">' + ' MOTOR VEHICLE THEFT' + '<br>'
    div.innerHTML +=  '<img src ="static/img/marker-icon-violet.png">' + ' NARCOTICS' + '<br>'
    div.innerHTML +=  '<img src ="static/img/marker-icon-yellow.png">' + ' ROBBERY' + '<br>'
    div.innerHTML +=  '<img src ="static/img/marker-icon-blue.png">' + ' THEFT' + '<br>'
    

    return div;
};

legend.addTo(map);



