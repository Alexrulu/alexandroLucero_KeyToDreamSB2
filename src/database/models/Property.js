module.exports = function(sequelize, dataTypes) {
  let alias = 'Property';
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    ownerId: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    model: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    adress: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    city: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    m2tot: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    m2cov: {
      type: dataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    ambiente: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    bathroom: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    cars: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    bedroom: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    kitchen: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    pool: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    balcony: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    grill: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    laundry: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    vigilance: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    principalImage: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    secondaryImages: {
      type: dataTypes.JSON,
      allowNull: true
    },
    video: {
      type: dataTypes.STRING(255),
      allowNull: true
    },
    contact: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    personalName: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    phoneBusiness: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    phonePersonal: {
      type: dataTypes.STRING(20),
      allowNull: false
    },
    price: {
      type: dataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    description: {
      type: dataTypes.TEXT,
      allowNull: false
    }
  }

  let config = {
    tableName: 'properties',
    timestamps: true,
  }

  const Property = sequelize.define(alias, cols, config);
  return Property
}