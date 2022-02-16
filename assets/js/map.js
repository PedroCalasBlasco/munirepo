
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

var recycle = L.marker([-31.6333294, -60.6900008], {icon:marcadorEscuelas});
recycle.bindPopup("<h3>Puntos de Reciclaje</h3><p>Estación Belgrano</p>").openPopup();

var overlay = L.layerGroup([recycle]).addTo(map);

var baseMaps = {
    "Street Map" : osm,
    "Imagen": Esri_WorldImagery
}

var overlayMaps =  {
    "<span style='color: green'>Reciclaje</span>": overlay,
} 

L.control.layers(baseMaps, overlayMaps).addTo(map);