const { getAll, create, getOne, remove, update } = require('../controllers/hotel.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');//se importa para proteger rutas(que sean privadas)

const hotelRouter = express.Router();

hotelRouter.route('/hotels')
    .get(getAll)
    .post(verifyJWT, create);//ruta protegida

hotelRouter.route('/hotels/:id')
    .get(getOne)
    .delete(verifyJWT,remove) //ruta protegida
    .put(verifyJWT,update); //ruta protegida

module.exports = hotelRouter;