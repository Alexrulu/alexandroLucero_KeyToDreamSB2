const express = require('express');
const router = express.Router();
const db = require('../database/config/db');
const functions = require('../services/functions');
const propiedades_type = functions.propiedades_type;
const propiedades_model = functions.propiedades_model;
module.exports = (upload) => {
  router.post('/save-property-step1', (req, res) => {
    const data = req.body;
    const user = req.session.user;
    if (!user) {
      return res.status(401).send('Debes iniciar sesión para publicar una propiedad.');
    }
    req.session.propertyData = {
      ownerId: user.id,
      type: propiedades_type[data.type.toUpperCase()],
      model: propiedades_model[data.model.toUpperCase()],
      adress: data.adress,
      city: data.city,
      total_area: Number(data.total_area),
      covered_area: Number(data.covered_area),
      rooms: Number(data.rooms),
      bathrooms: Number(data.bathrooms),
      parking: Number(data.parking),
      bedrooms: Number(data.bedrooms),
      kitchen: data.features?.includes('cocina') ? 1 : 0,
      pool: data.features?.includes('piscina') ? 1 : 0,
      balcony: data.features?.includes('balcon') ? 1 : 0,
      grill: data.features?.includes('parrilla') ? 1 : 0,
      laundry: data.features?.includes('lavadero') ? 1 : 0,
      vigilance: data.features?.includes('vigilancia') ? 1 : 0
    };
    res.redirect('/post2');
  });

  router.post('/save-property-step2', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'secondaryImages', maxCount: 4 },
    { name: 'video', maxCount: 1 }
  ]), (req, res) => {
    if (!req.session.propertyData) {
      return res.status(400).send('No se encontró la propiedad en la sesión.');
    }
    const files = req.files;
    req.session.propertyData.mainImage = files.mainImage ? `/images/${files.mainImage[0].originalname}` : null;
    req.session.propertyData.secondaryImages = files.secondaryImages ? JSON.stringify(files.secondaryImages.map(file => `/images/${file.originalname}`)) : '[]';
    req.session.propertyData.video = files.video ? `/images/${files.video[0].originalname}` : null;
    res.redirect('/post3');
  });

  router.post('/save-property-step3', (req, res) => {
    if (!req.session.propertyData) {
      return res.status(400).send('No se encontró la propiedad en la sesión.');
    }
    const data = req.body;
    req.session.propertyData.contact = data.contactType === 'inmobiliaria' ? 1 : 2;
    req.session.propertyData.email = data.email;
    req.session.propertyData.personalName = data.fullName;
    req.session.propertyData.phoneBusiness = data.phone || null;
    req.session.propertyData.phonePersonal = data.cell || null;
    res.redirect('/post4');
  });

  router.post('/publish-property', async (req, res) => {
    if (!req.session.propertyData) {
      return res.status(400).send('No se encontró la propiedad en la sesión.');
    }
    if (!req.body.price || !req.body.description) {
      return res.redirect(`/post4?error=Faltan datos para finalizar la publicación.`);
    }
    try {
      const propertyData = req.session.propertyData;
      const [result] = await db.query(
        `INSERT INTO properties (ownerId, type, model, adress, city, m2tot, m2cov, ambiente, bathroom, cars, bedroom, kitchen, pool, balcony, grill, laundry, vigilance, principalImage, secondaryImages, video, contact, email, personalName, phoneBusiness, phonePersonal, price, description) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [propertyData.ownerId, propertyData.type, propertyData.model,
          propertyData.adress, propertyData.city, propertyData.total_area, propertyData.covered_area, propertyData.rooms,
          propertyData.bathrooms, propertyData.parking, propertyData.bedrooms, propertyData.kitchen, propertyData.pool,
          propertyData.balcony, propertyData.grill, propertyData.laundry, propertyData.vigilance,
          propertyData.mainImage, propertyData.secondaryImages, propertyData.video,
          propertyData.contact, propertyData.email, propertyData.personalName, propertyData.phoneBusiness, propertyData.phonePersonal,
          Number(req.body.price), req.body.description]
      );
      delete req.session.propertyData;
      res.redirect("/");
    } catch (err) {
      console.error('Error al publicar la propiedad:', err);
      res.status(500).send('Error al publicar la propiedad.');
    }
  });
  return router;
};
