const catchError = require('../utils/catchError');
const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Images = require('../models/Images');
const Reviews = require('../models/Reviews');


//En get all se hace una query para filtrar (para ver opiniones por hotel junto con usuario que la realizó)
const getAll = catchError(async(req, res) => {
    const {hotelId,userId, offset, limitPerPage}=req.query;//query parameters: son los parámetros hotelId y userId, se reciben aquí, ya que el usuario los envía en la petición o lo que nosotros enviamos en el Postman, los usaremos para filtrar hoteles por ciudad y nombre
    const where ={};
    if (hotelId) where.hotelId =hotelId;
    if (userId) where.userId = userId;

    const results = await Review.findAll({
        include : [ { //este include se hace para que no se muestre el password, ya que en el postman se está mostrando la contraseña a pesar de que habiamos encriptado
            model : User,
            attributes:{exclude:['password']} //con el exclude se oculta la contraseña del usuario(User)
        },{
            model:Hotel,
            include:[Images]
        }
    ],
        where,
        offset:offset,
        limit: limitPerPage  
    });
    const total = await Reviews.count()
    return res.json({ total, results });
});

const create = catchError(async(req, res) => {
    const { rating, comment, hotelId } = req.body;
    const userId = req.user.id; //para mostrar el usuario logueado cuando este haga un POST
    const result = await Reviews.create({rating, comment, hotelId, userId});
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Reviews.findByPk(id,{include : [ User ]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Reviews.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Reviews.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}