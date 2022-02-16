
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var map = L.map('map', {
    center: [-31.6166, -60.7117],
    zoom: 13, 
    layers: [osm, Esri_WorldImagery]

});

var marcadorEscuelas = L.AwesomeMarkers.icon({
    icon: 'recycle',
    prefix:'fa',
    markerColor: 'green',
    iconColor: 'white'
  });



// urlGeoPuntos = "https://raw.githubusercontent.com/PedroCalasBlasco/munirepo/main/assets/json/ecopuntos.geojson";

// let response = await fetch('https://raw.githubusercontent.com/PedroCalasBlasco/munirepo/main/assets/json/ecopuntos.geojson')
//   .then(response => response.json())
//   .then(featuresEcoPuntos => console.log(featuresEcoPuntos));

//let layerEcoPuntos = L.geoJson(featuresEcoPuntos);

var obj;
let layerEcoPuntos;

var baseMaps = {
    "Street Map" : osm,
    "Imagen": Esri_WorldImagery
}




fetch('https://raw.githubusercontent.com/PedroCalasBlasco/munirepo/main/assets/json/ecopuntos.geojson')
  .then(res => res.json())
  .then(data => { 
    
    console.log(data);

    let layerEcoPuntos = L.geoJson(data,{
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3>" + feature.properties.Name + "</h3>");
            layer.setIcon(marcadorEscuelas);
        }
    });
    map.addLayer(layerEcoPuntos);
    console.log(layerEcoPuntos);
    var overlay = L.layerGroup([layerEcoPuntos]).addTo(map);

    var overlayMaps =  {
        "<span style='color: green'>Reciclaje</span>": overlay,
    }
    
    L.control.layers(baseMaps, overlayMaps).addTo(map);

  });

    

// var recycle = L.marker([-31.6333294, -60.6900008], {icon:marcadorEscuelas});
// recycle.bindPopup("<h3>Puntos de Reciclaje</h3><p>Estación Belgrano</p>").openPopup();

