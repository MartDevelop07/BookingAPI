const { getAll, remove, create} = require('../controllers/image.controllers');
const express = require('express');
const upload = require('../utils/multer');
const verifyJWT = require('../utils/verifyJWT');//se importa para proteger rutas(que sean privadas)

const imageRouter = express.Router();

imageRouter.route('/images')
    .get(verifyJWT, getAll) 
    .post(verifyJWT, upload.single('image'), create); //ruta protegida

imageRouter.route('/images/:id')
     .delete(verifyJWT, remove) //ruta protegida

module.exports = imageRouter;