const express = require('express');
const router = express.Router();
const db = require('../controllers/db'); // Controlador de la base de datos

const propiedades_type = db.propiedades_type;
const propiedades_model = db.propiedades_model;

module.exports = (upload) => {
  // Paso 1: Guardar datos básicos de la propiedad
  router.post('/save-property-step1', (req, res) => {
    const data = req.body;
    const user = req.session.user;
    const nuevaPropiedad = {
      ownerId: user.id,
      type: propiedades_type[data.type.toUpperCase()],
      model: propiedades_model[data.model.toUpperCase()],
      adress: data.address,
      city: data.city,
      m2tot: Number(data.total_area),
      m2cov: Number(data.covered_area),
      ambiente: Number(data.rooms),
      bathroom: Number(data.bathrooms),
      cars: Number(data.parking),
      bedroom: Number(data.bedrooms),
      kitchen: data.features?.includes('cocina') ? 1 : 0,
      pool: data.features?.includes('piscina') ? 1 : 0,
      balcony: data.features?.includes('balcon') ? 1 : 0,
      grill: data.features?.includes('parrilla') ? 1 : 0,
      laundry: data.features?.includes('lavadero') ? 1 : 0,
      vigilance: data.features?.includes('vigilancia') ? 1 : 0,
    };

    req.session.propiedad = req.session.propiedad || {};
    req.session.propiedad.step1 = nuevaPropiedad;
    console.log("Se ha iniciado el proceso de publicación de una propiedad.");
    console.log(nuevaPropiedad);
    res.redirect('/post2');
  });

  // Paso 2: Guardar imágenes y videos
  router.post('/save-property-step2', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'secondaryImages', maxCount: 32 },
    { name: 'video', maxCount: 1 }
  ]), (req, res) => {
    const propiedad = req.session.propiedad || {};
    const files = req.files;

    propiedad.step2 = {
      principalImage: files.mainImage ? `/images/${files.mainImage[0].originalname}` : undefined,
      secondaryImages: files.secondaryImages 
        ? files.secondaryImages.map(file => `/images/${file.originalname}`) : [],
      video: files.video ? `/images/${files.video[0].originalname}` : ''
    };

    req.session.propiedad = req.session.propiedad || {};
    req.session.propiedad.step2 = propiedad.step2;
    console.log('Propiedad después del paso 2:', propiedad);
    res.redirect('/post3');
  });

  // Paso 3: Guardar detalles de contacto
  router.post('/save-property-step3', (req, res) => {
    const data = req.body;
    const propiedad = req.session.propiedad || {};

    propiedad.step3 = {
      contactType: data.contactType === 'inmobiliaria' ? 1 : 2,
      email: data.email,
      personalName: data.fullName,
      phoneBusiness: data.phone || null,
      phonePersonal: data.cell || null
    };

    req.session.propiedad = propiedad;
    console.log('Propiedad después del paso 3:', propiedad);
    res.redirect('/post4');
  });

  // Paso 4: Publicar la propiedad
  router.post('/publish-property', (req, res) => {
    const propiedad = req.session.propiedad || {};

    if (propiedad.step1 && propiedad.step2 && propiedad.step3 && req.body.price && req.body.description) {
      propiedad.step4 = {
        price: Number(req.body.price),
        description: req.body.description
      };

      const propiedadNueva = {
        ...propiedad.step1,
        ...propiedad.step2,
        ...propiedad.step3,
        ...propiedad.step4
      };

      db.agregarPropiedad(propiedadNueva);
      delete req.session.propiedad;
      res.redirect('/');
    } else {
      res.redirect(`/post4?error=Faltan datos para finalizar la publicación.`);
    }
  });

  return router;
};
