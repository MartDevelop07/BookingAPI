const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Images = sequelize.define('images', {
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    //holtelId se enviará en el body
},{
    timestamps:false,  //timestamps: false es para evitar que se agreguen automáticamente los campos createdAt y updatedAt, en caso de que no necesites conocer la fecha y hora de creación y actualización de un registro 
});

module.exports = Images;