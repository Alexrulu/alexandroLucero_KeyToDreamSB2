// Crear el mapa y centrado en Buenos Aires, Argentina
var map = L.map('mapa').setView([-34.603684, -58.381559], 13);  // Coordenadas de Buenos Aires

// Agregar la capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Crear un ícono personalizado para el marcador
var customIcon = L.icon({
    iconUrl: '/images/marker-icon.png',          // Ruta al ícono del marcador
    iconRetinaUrl: '/images/marker-icon-2x.png',  // Ruta al ícono de alta resolución (opcional)
    shadowUrl: '/images/marker-shadow.png',      // Ruta a la sombra del marcador
    iconSize: [25, 41],                          // Tamaño del ícono
    iconAnchor: [12, 41],                        // Punto de anclaje del ícono
    popupAnchor: [1, -34],                       // Ubicación del popup
    shadowSize: [41, 41]                         // Tamaño de la sombra
});

// Crear el marcador con el ícono personalizado
L.marker([-34.603684, -58.381559], { icon: customIcon }).addTo(map)
  .bindPopup("<b>Buenos Aires</b><br>Ubicación")
  .openPopup();

// Crear el control de geocodificación sin el marcador predeterminado
var geocoder = L.Control.geocoder({
    defaultMarkGeocode: false // Evitar la creación del marcador predeterminado
}).on('markgeocode', function(e) {
    // Obtener la ubicación del resultado de la búsqueda
    var latLng = e.geocode.center;

    // Centrar el mapa en la ubicación encontrada y establecer el zoom
    map.setView(latLng, 13);  // Centra el mapa y ajusta el zoom (13 es un nivel de zoom adecuado para ciudades)

    // Crear un marcador con el ícono personalizado y agregarlo al mapa
    L.marker(latLng, { icon: customIcon }).addTo(map)
      .bindPopup("<b>" + e.geocode.name + "</b>")
      .openPopup();
}).addTo(map);


