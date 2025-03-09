// mapa centrado en Buenos Aires, Argentina
var map = L.map('mapa').setView([-34.603684, -58.381559], 13);
// Agregar la capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://hot.openstreetmap.org">Humanitarian OSM Team</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// buscador geocoder
var geocoder = L.Control.geocoder({
  defaultMarkGeocode: false
}).on('markgeocode', function(e) {
  var latLng = e.geocode.center;
  map.setView(latLng, 13);
  // agregar un marcador con la ubicación encontrada
  var searchMarker = L.marker(latLng, { icon: customIcon, opacity: 0 }).addTo(map)
    .bindPopup(`<b>${e.geocode.name}</b>`)
    .openPopup();
  // suavizar la aparición del marcador del buscador
  let opacity = 0;
  const fadeIn = setInterval(() => {
    opacity += 0.1;
    searchMarker.setOpacity(opacity);
    if (opacity >= 1) clearInterval(fadeIn);
  }, 50);
}).addTo(map);
// ícono personalizado para el marcador del buscador
var customIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// ícono personalizado para las propiedades con opacidad inicial 0
var propertyIcon = L.icon({
  iconUrl: '/images/map-icon-property.png',
  iconSize: [30, 55],
  iconAnchor: [30, 55],
  popupAnchor: [-15, -10],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [40, 40],
  shadowAnchor: [27, 42]
});
// obtener datos de propiedades, reutilizamos la funcion de carruseles, ya que estamos en /index
const carruseles = window.carruseles;
const propiedadesUnicas = new Set();
// función para geocodificar una dirección
function obtenerCoordenadas(direccion, ciudad, callback) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion + ', ' + ciudad)}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        callback(null, [data[0].lat, data[0].lon]);
      } else {
        console.warn(`No se encontraron coordenadas para: ${direccion}, ${ciudad}`);
        callback('No encontrado', null);
      }
    })
    .catch(error => {
      console.error('Error en la geocodificación:', error);
      callback(error, null);
    });
}
// recorrer las propiedades y geocodificarlas, es decir, convertir las direcciones en coordenadas (lat y lon)
Object.keys(carruseles).forEach((id) => {
  const images = carruseles[id];
  images.forEach((propiedad, index) => { // Index para retraso en la animación
    const claveUnica = `${propiedad.city}-${propiedad.adress}`;
    if (!propiedadesUnicas.has(claveUnica)) {
      propiedadesUnicas.add(claveUnica);
      obtenerCoordenadas(propiedad.adress, propiedad.city, (error, coordenadas) => {
        if (!error && coordenadas) {
          // crear el popup con imagen, dirección y precio
          const popupContent = `
            <div style="text-align:center;">
              <img src="${propiedad.principalImage}" alt="Propiedad en ${propiedad.city}" style="width:100px; height:auto; border-radius:8px;">
              <p><b>${propiedad.city}</b></p>
              <p>${propiedad.adress}</p>
              <p><b>USD $${propiedad.price.toLocaleString('en-US')}</b></p>
              <a href="/articulo/${propiedad.id}" style="text-decoration:none; color:#007bff; font-weight:bold;">Ver más</a>
            </div>
          `;
          // agregar el marcador con un pequeño retraso para animación
          setTimeout(() => {
            const marker = L.marker(coordenadas, { icon: propertyIcon, opacity: 0 }).addTo(map);
            marker.bindPopup(popupContent);
            // suavizar la aparición del marcador
            let opacity = 0;
            const fadeIn = setInterval(() => {
              opacity += 0.1;
              marker.setOpacity(opacity);
              if (opacity >= 1) clearInterval(fadeIn);
            }, 50);
          }, index * 200); // retraso progresivo
        }
      });
    }
  });
});
