
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

var Stamen_Watercolor = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	ext: 'jpg'
});

var Stamen_TerrainBackground = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	ext: 'png'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var map = L.map('map', {
    center: [-31.6166, -60.7117],
    zoom: 13, 
    layers: [osm, Stadia_AlidadeSmooth, Stadia_AlidadeSmoothDark, Stamen_Watercolor, Stamen_TerrainBackground, Esri_WorldImagery]

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
    "Stadia" : Stadia_AlidadeSmooth, 
    "Dark": Stadia_AlidadeSmoothDark,
    "Color": Stamen_Watercolor,
    "Terrain": Stamen_TerrainBackground,
    "Imagen": Esri_WorldImagery
}

var overlayMaps =  {
    "<span style='color: green'>Reciclaje</span>": overlay,
} 

L.control.layers(baseMaps, overlayMaps).addTo(map);