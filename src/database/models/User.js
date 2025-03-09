module.exports = function(sequelize, dataTypes) {
  let alias = 'User'
  let cols = {
    id: {
      type: dataTypes.STRING(36),
      primaryKey: true,
      allowNull: false
    },
    userType: {
      type: dataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: dataTypes.STRING(255),
      allowNull: false
    },
    razonSocial: {
      type: dataTypes.STRING(255),
      allowNull: true
    },
    fiscalCondition: {
      type: dataTypes.INTEGER,
      allowNull: true
    },
    dni: {
      type: dataTypes.STRING(20),
      allowNull: true
    },
    phone: {
      type: dataTypes.STRING(20),
      allowNull: true
    },
    cellphone: {
      type: dataTypes.STRING(20),
      allowNull: true
    },
    favoritos: {
      type: dataTypes.JSON,
      allowNull: true
    }
  }

  let config = {
    tableName: 'users',
    timestamps: true,
  }

  const User = sequelize.define(alias, cols, config);
  return User;
}