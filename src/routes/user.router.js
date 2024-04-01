const { getAll, create, getOne, remove, update, login } = require('../controllers/user.controllers.js');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');//se importa para proteger rutas(que sean privadas)

const userRouter = express.Router();

userRouter.route('/users')
    .get(verifyJWT, getAll)
    .post(create);

userRouter.route('/users/login')
.post(login);

userRouter.route('/users/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = userRouter;