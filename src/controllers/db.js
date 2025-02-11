const propiedades_type = { VENTA: 1, ALQUILER: 2, TEMPORADA: 3 };
const propiedades_model = { CASA: 1, DEPARTAMENTO: 2, PH: 3, CONDOMINIO: 4 };
let propiedades = [
  {
    id: 1,
    ownerId:1,
    type: propiedades_type.VENTA,
    model: propiedades_model.CASA,
    adress: 'La alameda 22', // También será el titular de la publicación
    city: 'Nordelta, Buenos aires',
    m2tot: 362,
    m2cov: 298,
    ambiente: 4,
    bathroom: 6,
    cars: 4,
    bedroom: 4,
    kitchen: 1, //1:si, 2:no
    pool: 1,
    balcony: 1,
    grill: 1,
    laundry: 1,
    vigilance: 1,
    principalImage: '/images/alameda1.jpg',
    secondaryImages: [
      '/images/alameda2.jpg',
      '/images/alameda3.jpg',
      '/images/alameda4.jpg',
      '/images/alameda5.jpg',
    ],
    video: '/videos/nordelta.mp4',
    contact: 1, //1:inmobiliaria, 2:dueño directo
    email: 'example@gmail.com',
    personalName: 'TIZADO PROPERTIESS',
    phoneBusiness: 44551234,
    phonePersonal: 1123456789,
    price: 299999,
    description: 'Gran calidad constructiva y excelente lote con un fondo con quincha y lugar para asador!!!! La galeria con una gran parrilla y muy espaciosa! La casa esta impecable por donde la mires, tiene una gran cocina, impecable, un Family pegado a la cocina y salida a la galeria que hace que se viva permanentemente en este lugar. Losa radiante, lote ubicado cercano a la guardia y próximo a la laguna del barrio.'
  },
  {
    id: 2,
    ownerId:1,
    type: propiedades_type.ALQUILER,
    model: propiedades_model.DEPARTAMENTO,
    adress: 'Islas del Canal 03', // También será el titular de la publicación
    city: 'Mar del plata, Buenos aires',
    m2tot: 236,
    m2cov: 328,
    ambiente: 5,
    bathroom: 4,
    cars: 2,
    bedroom: 4,
    kitchen: 1, //1:si, 2:no
    pool: 2,
    balcony: 1,
    grill: 1,
    laundry: 1,
    vigilance: 1,
    principalImage: '/images/canal1.jpg',
    secondaryImages: [
      '/images/canal2.jpg',
      '/images/canal3.jpg',
      '/images/canal4.jpg',
      '/images/canal5.jpg',
    ],
    video: '/videos/nordelta.mp4',
    contact: 1, //1:inmobiliaria, 2:dueño directo
    email: 'example@gmail.com',
    personalName: 'AB BROKERS',
    phoneBusiness: 44551234,
    phonePersonal: 1123456789,
    price: 4500,
    description: 'Living comedor con espectacular vista al agua. Cocina integrada.Mesada con isla de silestone. Muy luminoso con gran vista desde todo el ambiente.Dependencia y Lavadero. Dos dormitorios en suite con salida al balcón. Suite principal con vestidor y baño con box de ducha revestido en porcelanato.'
  },
  {
    id: 3,
    ownerId:1,
    type: propiedades_type.VENTA,
    model: propiedades_model.CASA,
    adress: 'Santa Barbara 234', // También será el titular de la publicación
    city: 'Troncos del Talar, Buenos Aires',
    m2tot: 136,
    m2cov: 128,
    ambiente: 6,
    bathroom: 4,
    cars: 3,
    bedroom: 6,
    kitchen: 1, //1:si, 2:no
    pool: 1,
    balcony: 1,
    grill: 1,
    laundry: 1,
    vigilance: 1,
    principalImage: '/images/barbara1.jpg',
    secondaryImages: [
      '/images/barbara2.jpg',
      '/images/barbara3.webp',
      '/images/barbara4.jpg',
      '/images/barbara5.jpg',
    ],
    video: '/videos/nordelta.mp4',
    contact: 2, //1:inmobiliaria, 2:dueño directo
    email: 'example@gmail.com',
    personalName: 'Esteban Quito',
    phoneBusiness: 44551234,
    phonePersonal: 1123456789,
    price: 149999,
    description: 'Hermosa casa tecnológica totalmente automatizada con sistema ALEXA. Todos los sistemas eléctricos y electrónicos se pueden activar por comandos de Voz y desde el Celular a distancia. Riego, Televisores, Luminarias, Aires Acondicionados, Lavarropas, Cafetera Etc. La casa está toda reciclada a nueva, en impecable estado y armoniosamente decorada, totalmente amoblada y equipada.'
  },
  {
    id: 4,
    ownerId:1,
    type: propiedades_type.VENTA,
    model: propiedades_model.CASA,
    adress: 'Rivadavia 321',
    city: 'Buenos Aires, Argentina',
    m2tot: 150,
    m2cov: 140,
    ambiente: 5,
    bathroom: 3,
    cars: 2,
    bedroom: 4,
    kitchen: 1,
    pool: 1,
    balcony: 1,
    grill: 1,
    laundry: 1,
    vigilance: 1,
    principalImage: '/images/rivadavia1.jpg',
    secondaryImages: [
      '/images/rivadavia2.jpg',
      '/images/rivadavia3.jpg',
      '/images/rivadavia4.jpg',
      '/images/rivadavia5.jpg',
    ],
    video: '/videos/rivadavia.mp4',
    contact: 1,
    email: 'contact@inmobiliaria.com',
    personalName: 'BLANCO PROPERTIESS',
    phoneBusiness: 44223344,
    phonePersonal: 1122334455,
    price: 215000,
    description: 'Amplia casa con excelente distribución, patio interno, sistema de cámaras de seguridad y cerramientos modernos.'
  },
  {
    id: 5,
    ownerId:1,
    type: propiedades_type.ALQUILER,
    model: propiedades_model.DEPARTAMENTO,
    adress: 'Av. Libertador 1000',
    city: 'Capital Federal, Buenos Aires',
    m2tot: 80,
    m2cov: 75,
    ambiente: 3,
    bathroom: 2,
    cars: 1,
    bedroom: 2,
    kitchen: 1,
    pool: 0,
    balcony: 1,
    grill: 0,
    laundry: 1,
    vigilance: 0,
    principalImage: '/images/libertador1.jpg',
    secondaryImages: [
      '/images/libertador2.jpg',
      '/images/libertador3.jpg',
      '/images/libertador4.jpg',
      '/images/libertador5.jpg',
    ],
    video: '/videos/libertador.mp4',
    contact: 1,
    email: 'ventas@inmobiliaria.com',
    personalName: 'Laura Gómez',
    phoneBusiness: 44112233,
    phonePersonal: 1133445566,
    price: 1000,
    description: 'Cómodo departamento en zona céntrica con excelentes accesos y cercanía a todos los servicios. Consta de 2 habitaciones, amplio balcón y espacio de cochera.'
  },
  {
    id: 6,
    ownerId:1,
    type: propiedades_type.VENTA,
    model: propiedades_model.CASA,
    adress: 'Av. Santa Fe 2050',
    city: 'La Plata, Buenos Aires',
    m2tot: 200,
    m2cov: 180,
    ambiente: 7,
    bathroom: 5,
    cars: 4,
    bedroom: 6,
    kitchen: 1,
    pool: 1,
    balcony: 1,
    grill: 1,
    laundry: 1,
    vigilance: 1,
    principalImage: '/images/santafe1.jpg',
    secondaryImages: [
      '/images/santafe2.jpg',
      '/images/santafe3.jpg',
      '/images/santafe4.jpg',
      '/images/santafe5.jpg',
    ],
    video: '/videos/santafe.mp4',
    contact: 2,
    email: 'contacto@dueño.com',
    personalName: 'TIZ4DO',
    phoneBusiness: 45554433,
    phonePersonal: 1133224433,
    price: 500000,
    description: 'Casa en venta con piscina, jardín amplio, parrilla y cochera para varios autos. Ideal para familias grandes que busquen comodidad y tranquilidad.'
  },
  {
    id: 7,
    ownerId:1,
    type: propiedades_type.ALQUILER,
    model: propiedades_model.DEPARTAMENTO,
    adress: 'Av. Cabildo 1500',
    city: 'Capital Federal, Buenos Aires',
    m2tot: 60,
    m2cov: 55,
    ambiente: 3,
    bathroom: 1,
    cars: 1,
    bedroom: 2,
    kitchen: 1,
    pool: 0,
    balcony: 1,
    grill: 0,
    laundry: 1,
    vigilance: 0,
    principalImage: '/images/cabildo1.jpg',
    secondaryImages: [
      '/images/cabildo2.jpg',
      '/images/cabildo3.jpg',
      '/images/cabildo4.jpg',
      '/images/cabildo5.jpg',
    ],
    video: '/videos/cabildo.mp4',
    contact: 1,
    email: 'info@inmobiliaria.com',
    personalName: 'METRO REALTY',
    phoneBusiness: 44113344,
    phonePersonal: 1122336677,
    price: 750,
    description: 'Departamento de 2 habitaciones, cocina independiente, con balcón y cochera. Ideal para parejas o personas solas que busquen comodidad y buena ubicación.'
  },
  {
    id: 8,
    ownerId:1,
    type: propiedades_type.ALQUILER,
    model: propiedades_model.CASA,
    adress: 'Av. Del Libertador 8000',
    city: 'San Isidro, Buenos Aires',
    m2tot: 120,
    m2cov: 110,
    ambiente: 4,
    bathroom: 2,
    cars: 2,
    bedroom: 3,
    kitchen: 1,
    pool: 1,
    balcony: 1,
    grill: 1,
    laundry: 1,
    vigilance: 1,
    principalImage: '/images/libertadorr1.jpg',
    secondaryImages: [
      '/images/libertadorr2.jpg',
      '/images/libertadorr3.jpg',
      '/images/libertadorr4.jpg',
      '/images/libertadorr5.jpg',
    ],
    video: '/videos/libertador2.mp4',
    contact: 2,
    email: 'juanperez@inmobiliaria.com',
    personalName: 'Juan Pérez',
    phoneBusiness: 45556677,
    phonePersonal: 1144332255,
    price: 1300,
    description: 'Hermosa casa con jardín, piscina, parrilla y cochera. Ubicada en zona residencial tranquila y segura. Perfecta para familias que busquen un espacio amplio y cómodo.'
  }
]
// Marcar una propiedad como favorita
function marcarFavorito(req, id) {
  if (!req.session.favoritos.includes(id)) {
    req.session.favoritos.push(id);
    console.log(`Propiedad con ID ${id} marcada como favorita.`);
  } else {
    console.log(`La propiedad con ID ${id} ya está en favoritos.`);
  }
}
// Desmarcar una propiedad como favorita
function desmarcarFavorito(req, id) {
  req.session.favoritos = req.session.favoritos.filter(favId => favId !== id);
  console.log(`Propiedad con ID ${id} removida de favoritos.`);
}
function obtenerFavoritos(favoritos) {
  // Filtra las propiedades favoritas usando los IDs almacenados en favoritos
  return propiedades.filter(propiedad => favoritos.includes(propiedad.id));
}
// Función para agregar una nueva propiedad
function agregarPropiedad(nuevaPropiedad) {
  const nuevoId = propiedades[propiedades.length - 1].id + 1; // Genera el ID automáticamente
  const propiedadConId = { id: nuevoId, ...nuevaPropiedad };
  propiedades.push(propiedadConId);
  console.log(`Propiedad con ID ${nuevoId} agregada exitosamente.`);
}
// Función para eliminar una propiedad por ID, asegurando que solo el propietario pueda hacerlo
function eliminarPropiedad(propiedadId, userId) {
  // Buscar el índice de la propiedad
  const propiedadIndex = propiedades.findIndex(prop => prop.id === propiedadId);

  if (propiedadIndex === -1) {
    return { success: false, error: 'Propiedad no encontrada.' };
  }

  // Verificar si el usuario es el dueño de la propiedad
  if (propiedades[propiedadIndex].ownerId !== userId) {
    return { success: false, error: 'No tienes permiso para eliminar esta propiedad.' };
  }

  // Eliminar la propiedad
  propiedades.splice(propiedadIndex, 1);
  return { success: true, message: `Propiedad con ID ${propiedadId} eliminada correctamente.` };
}
module.exports = {
  propiedades,
  propiedades_type,
  propiedades_model,
  agregarPropiedad,
  marcarFavorito,
  desmarcarFavorito,
  obtenerFavoritos,
  eliminarPropiedad,
};


// // Función para agregar o quitar una propiedad de los favoritos
// function toggleFavorito(idPropiedad) {
//   const index = propiedadesFavoritas.indexOf(idPropiedad);
//   if (index === -1) {
//     // Si la propiedad no está en favoritos, agregarla
//     propiedadesFavoritas.push(idPropiedad);
//     return { success: true, message: 'Propiedad agregada a favoritos' };
//   } else {
//     // Si la propiedad ya está en favoritos, eliminarla
//     propiedadesFavoritas.splice(index, 1);
//     return { success: true, message: 'Propiedad eliminada de favoritos' };
//   }
// }