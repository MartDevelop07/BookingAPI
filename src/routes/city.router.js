const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');//se importa para proteger rutas(que sean privadas)

const cityRouter = express.Router();

cityRouter.route('/cities')
    .get( getAll)
    .post(verifyJWT, create); //ruta protegida

cityRouter.route('/city/:id')
    .get(getOne)
    .delete(verifyJWT, remove) //ruta protegida
    .put(verifyJWT, update); //ruta protegida

module.exports = cityRouter;