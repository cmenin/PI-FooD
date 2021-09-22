const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image:{
      type:DataTypes.STRING
    },
    diets:{
      type:DataTypes.STRING
    },
    summary:{
      type:DataTypes.STRING,
      allowNull: false
    },
    aggregateLikes:{
      type:DataTypes.STRING,
      defaultValue:0
    },
    healthScore:{
      type:DataTypes.INTEGER,
      defaultValue:0
    },
    instructions:{
      type: DataTypes.STRING
    },
    createdInDb:{ 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    }

  });
};





// ID: *
// Nombre *
// Resumen del plato *
// Puntuación
// Nivel de "comida saludable"
// Paso a paso