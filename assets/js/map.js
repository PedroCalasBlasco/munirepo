
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var map = L.map('map', {
    center: [-31.6166, -60.7117],
    zoom: 13, 
    layers: [Esri_WorldImagery, osm]

});

var marcadorEcoPuntos = L.AwesomeMarkers.icon({
    icon: 'recycle',
    prefix:'fa',
    markerColor: 'darkgreen',
    iconColor: 'white'
  });


  var marcadorEcoPuntosCampanas = L.AwesomeMarkers.icon({
    icon: 'bell',
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
    "Imagen": Esri_WorldImagery,
    "Street Map" : osm,
    
}




fetch('https://raw.githubusercontent.com/PedroCalasBlasco/munirepo/main/assets/json/ecopuntos.geojson')
  .then(res => res.json())
  .then(data => { 
    
    console.log(data);

    let layerEcoPuntos = L.geoJson(data,{
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3>EcoPuntos con Atención Personalizada</h3><h2>" + feature.properties.Name + "</h2><p><strong>¿Qué podes llevar?</strong></br> Papel, cartón, plástico, latas, vidrio y aparatos eléctricos y electrónicos en desuso.</p><p><strong>Horario de Atención</strong></br> 9 a 19 hs.</p>");
            layer.setIcon(marcadorEcoPuntos);
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



  fetch(' https://raw.githubusercontent.com/PedroCalasBlasco/munirepo/main/assets/json/campanas.geojson')
  .then(res => res.json())
  .then(data => { 
    
    console.log(data);

    let layerEcoPuntosCampanas = L.geoJson(data,{
        onEachFeature: function(feature, layer){
            layer.bindPopup("<h3>EcoPuntos Sin Atención Personalizada</h3><h2>" + feature.properties.nombre + "</h2><p><strong>¿Qué podes llevar?</strong></br> Papel, cartón, plástico, latas, vidrio</p>");
            layer.setIcon(marcadorEcoPuntosCampanas);
        }
    });
    map.addLayer(layerEcoPuntosCampanas);
    console.log(layerEcoPuntosCampanas);
    
    // var overlay = L.layerGroup([layerEcoPuntos]).addTo(map);

    // var overlayMaps =  {
    //     "<span style='color: green'>Reciclaje</span>": overlay,
    // }
    
    // L.control.layers(baseMaps, overlayMaps).addTo(map);

  });



 



