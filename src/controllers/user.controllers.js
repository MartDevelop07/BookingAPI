const catchError = require('../utils/catchError');
const User = require('../models/User');
const bcrypt = require('bcrypt'); //se importa bcrypt para encriptar contraseña
const jwt = require('jsonwebtoken'); //se importa json web token para retornar usuario que intenta logearse

const getAll = catchError(async(req, res) => {
    const results = await User.findAll();
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;//encriptar contraseña
    const encriptedPassword = await bcrypt.hash(password, 10); //encriptar contraseña
    const result = await User.create({
        firstName, lastName, email, password: encriptedPassword, gender,
    });//encriptar contraseña
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await User.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email, gender } = req.body;//para evitar que la contraseña se actualice
    const result = await User.update(
        { firstName, lastName, email, gender }, //para evitar que la contraseña se actualice
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

//para que retorne usuario que se intenta logear junto con un token
const login = catchError(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
     if (!user) return res.status(401).json({message: 'Credenciales inválidas'}); 
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return res.status(401).json({ message: 'Credenciales inválidas'});
    const token = jwt.sign( //para que retorne usuario que intenta logearse junto con un token de acceso
        { user },
        process.env.TOKEN_SECRET,
        { expiresIn: '1d' }
    );
    return res.json({user, token}); 
        
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
}