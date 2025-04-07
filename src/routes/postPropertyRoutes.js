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
  
    // Validación de campos obligatorios
    const requiredFields = ['type', 'model', 'adress', 'city', 'total_area', 'covered_area'];
    for (const field of requiredFields) {
      if (!data[field] || data[field].toString().trim() === '') {
        return res.status(400).send(`El campo "${field}" es obligatorio.`);
      }
    }
  
    // Validación de números válidos en total_area y covered_area
    if (isNaN(data.total_area) || isNaN(data.covered_area)) {
      return res.status(400).send('Los campos "total_area" y "covered_area" deben ser números válidos.');
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
  ]), (req, res) => {
    if (!req.session.propertyData) {
      return res.status(400).send('No se encontró la propiedad en la sesión.');
    }
  
    const files = req.files;
  
    // Validación: mainImage es obligatoria
    if (!files || !files.mainImage || files.mainImage.length === 0) {
      return res.status(400).send('La imagen principal (mainImage) es obligatoria.');
    }
  
    req.session.propertyData.mainImage = `/images/${files.mainImage[0].originalname}`;
    req.session.propertyData.secondaryImages = files.secondaryImages
      ? JSON.stringify(files.secondaryImages.map(file => `/images/${file.originalname}`))
      : '[]';
  
    res.redirect('/post3');
  });
  

  router.post('/save-property-step3', (req, res) => {
    if (!req.session.propertyData) {
      return res.status(400).send('No se encontró la propiedad en la sesión.');
    }
  
    const data = req.body;
  
    // Validación de email obligatorio
    if (!data.email || data.email.trim() === '') {
      return res.status(400).send('El correo electrónico es obligatorio.');
    }
  
    // Validación de al menos un teléfono
    const hasPhoneBusiness = data.phone && data.phone.trim() !== '';
    const hasPhonePersonal = data.cell && data.cell.trim() !== '';
    if (!hasPhoneBusiness && !hasPhonePersonal) {
      return res.status(400).send('Debes ingresar al menos un número de teléfono.');
    }
  
    // Si pasa la validación, se guarda en la sesión
    req.session.propertyData.contact = data.contactType === 'inmobiliaria' ? 1 : 2;
    req.session.propertyData.email = data.email.trim();
    req.session.propertyData.personalName = data.fullName?.trim() || null;
    req.session.propertyData.phoneBusiness = hasPhoneBusiness ? data.phone.trim() : null;
    req.session.propertyData.phonePersonal = hasPhonePersonal ? data.cell.trim() : null;
  
    res.redirect('/post4');
  });
  

  router.post('/publish-property', async (req, res) => {
    if (!req.session.propertyData) {
      return res.status(400).send('No se encontró la propiedad en la sesión.');
    }
    if (!req.body.price || !req.body.description || req.body.description.trim().length < 20) {
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
