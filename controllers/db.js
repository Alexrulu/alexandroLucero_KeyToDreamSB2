const propiedades_type = { VENTA: 1, ALQUILER: 2, TEMPORADA: 3 };
const propiedades_model = { CASA: 1, DEPARTAMENTO: 2, PH: 3, CONDOMINIO: 4 };


let propiedades = [
  {
    id: 1,
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
    plan: '/images/planos.jpg',
    video: '/videos/nordelta.mp4',
    contact: 1, //1:inmobiliaria, 2:dueño directo
    email: 'example@gmail.com',
    personalName: 'TIZADO PROPERTIESS',
    phoneBusiness: 44551234,
    phonePersonal: 1123456789,
    paidPeriod: 4, //  1:mensual, 2:3 meses, 3:anual, 4:compra
    price: 299999,
    description: 'Gran calidad constructiva y excelente lote con un fondo con quincha y lugar para asador!!!! La galeria con una gran parrilla y muy espaciosa! La casa esta impecable por donde la mires, tiene una gran cocina, impecable, un Family pegado a la cocina y salida a la galeria que hace que se viva permanentemente en este lugar. Losa radiante, lote ubicado cercano a la guardia y próximo a la laguna del barrio.'
  },
  {
    id: 2,
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
    plan: '/images/planos.jpg',
    video: '/videos/nordelta.mp4',
    contact: 1, //1:inmobiliaria, 2:dueño directo
    email: 'example@gmail.com',
    personalName: 'AB BROKERS',
    phoneBusiness: 44551234,
    phonePersonal: 1123456789,
    paidPeriod: 1, //  1:mensual, 2:3 meses, 3:anual, 4:compra
    price: 4500,
    description: 'Living comedor con espectacular vista al agua. Cocina integrada.Mesada con isla de silestone. Muy luminoso con gran vista desde todo el ambiente.Dependencia y Lavadero. Dos dormitorios en suite con salida al balcón. Suite principal con vestidor y baño con box de ducha revestido en porcelanato.'
  },
  {
    id: 3,
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
      '/images/barbara3.jpg',
      '/images/barbara4.jpg',
      '/images/barbara5.jpg',
    ],
    plan: '/images/planos.jpg',
    video: '/videos/nordelta.mp4',
    contact: 2, //1:inmobiliaria, 2:dueño directo
    email: 'example@gmail.com',
    personalName: 'Esteban Quito',
    phoneBusiness: 44551234,
    phonePersonal: 1123456789,
    paidPeriod: 4, //  1:mensual, 2:3 meses, 3:anual, 4:compra
    price: 149999,
    description: 'Hermosa casa tecnológica totalmente automatizada con sistema ALEXA. Todos los sistemas eléctricos y electrónicos se pueden activar por comandos de Voz y desde el Celular a distancia. Riego, Televisores, Luminarias, Aires Acondicionados, Lavarropas, Cafetera Etc. La casa está toda reciclada a nueva, en impecable estado y armoniosamente decorada, totalmente amoblada y equipada.'
  }
]
//leve protección de seguridad
if (!propiedades_type[req.body.tipo] || !propiedades_model[req.body.modelo]) {
  return res.status(400).send('Valores inválidos en tipo o modelo.');
}

// Validar que se completen los campos
const requiredFields = [
  'type', 'model', 'adress', 'city', 'm2tot', 'm2cov', 'ambiente', 'bathroom',
  'cars', 'bedroom', 'kitchen', 'pool', 'balcony', 'grill', 'laundry', 
  'vigilance', 'principalImage', 'secondaryImages', 'contact', 'email', 
  'personalName', 'phoneBusiness', 'phonePersonal', 'paidPeriod', 'price', 
  'description'
];
const validateFields = (req, res, next) => {
  for (const field of requiredFields) {
    if (!req.body[field]) {
      return res.status(400).send(`El campo ${field} es obligatorio.`);
    }
  }
  if (!/\S+@\S+\.\S+/.test(req.body.email)) {
    return res.status(400).send('El correo electrónico no es válido.');
  }
  next();
};
// Generar un nuevo ID
const generateNewId = () => Math.max(...propiedades.map(p => p.id)) + 1;
// Función para obtener las propiedades
exports.getPropiedades = (req, res) => {
  res.render('propiedades', { propiedades });
};
// Agregar una propiedad
exports.addPropiedad = [validateFields, (req, res) => {
  const newId = generateNewId();
  const newPropiedad = {
    id: newId,
    type: parseInt(req.body.type),
    model: parseInt(req.body.model),
    adress: req.body.adress,
    city: req.body.city,
    m2tot: parseInt(req.body.m2tot),
    m2cov: parseInt(req.body.m2cov),
    ambiente: parseInt(req.body.ambiente),
    bathroom: parseInt(req.body.bathroom),
    cars: parseInt(req.body.cars),
    bedroom: parseInt(req.body.bedroom),
    kitchen: parseInt(req.body.kitchen),
    pool: parseInt(req.body.pool),
    balcony: parseInt(req.body.balcony),
    grill: parseInt(req.body.grill),
    laundry: parseInt(req.body.laundry),
    vigilance: parseInt(req.body.vigilance),
    principalImage: req.body.principalImage,
    secondaryImages: req.body.secondaryImages ? req.body.secondaryImages.split(',').map(img => img.trim()): [],
    plan: req.body.plan,
    video: req.body.video,
    contact: parseInt(req.body.contact),
    email: req.body.email,
    personalName: req.body.personalName,
    phoneBusiness: parseInt(req.body.phoneBusiness),
    phonePersonal: parseInt(req.body.phonePersonal),
    paidPeriod: parseInt(req.body.paidPeriod),
    price: parseInt(req.body.price),
    description: req.body.description,
  };
  // Validación del número máximo de imágenes secundarias
  if (newPropiedad.secondaryImages.length > 32) {
    return res.status(400).send('El número máximo de imágenes secundarias es 32.');
  }
  propiedades.push(newPropiedad);
  res.redirect('/');
}];