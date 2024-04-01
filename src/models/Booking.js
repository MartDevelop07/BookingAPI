const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Booking = sequelize.define('booking', {
    checkIn: {
        type: DataTypes.STRING,
        allowNull: false
    },
    checkOut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    //hotelId se hacen asociaciones
    //userId  se hacen asociaciones
});

module.exports = Booking;