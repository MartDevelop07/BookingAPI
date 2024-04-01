const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Reviews = sequelize.define('reviews', {
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
});

module.exports = Reviews;