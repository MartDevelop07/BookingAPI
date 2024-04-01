const catchError = require('../utils/catchError');
const Hotel = require('../models/Hotel');
const City = require('../models/City');
const { Op } = require('sequelize'); //para operador like en sequelize
const Reviews = require('../models/Reviews');
const Images = require('../models/Images');


//En get all se hace una query para filtrar (para buscar hoteles  por cityId y name)
const getAll = catchError(async(req, res) => {
    const {name, cityId} = req.query //query parameters: son los parámetros name y cityId, se reciben aquí, ya que el usuario los envía en la petición o lo que nosotros enviamos en el Postman, los usaremos para filtrar hoteles por ciudad y nombre
    const where = {}
    if(cityId) where.cityId = cityId
    if(name) where.name = { [Op.iLike]: `%${name}%` } //% es equivalente a un operador LIKE en postgress, en sequelize se escribe Op.ilike porque busca la pabra contenida dentro de simbolos % y puede ocntener mayusculas y minusculas
    const results = await Hotel.findAll({
        include: [  City, Images, Reviews ],
        where: where,
    });

    const hotelWithRating = results.map(hotel => {
        const hotelJson = hotel.toJSON()
        let sum = 0
        hotelJson.reviews.forEach(reviews => {
            sum += reviews.rating
        })
        const totalReview = hotelJson.reviews.length
        const average = totalReview > 0 ? sum / totalReview : 0
        delete hotelJson.reviews
        return { ...hotelJson, rating: average}
        
    })

    return res.json(hotelWithRating);
});

const create = catchError(async(req, res) => {
    const result = await Hotel.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.findByPk(id, {include: [Reviews, Images, City]});
    if(!result) return res.sendStatus(404)
    const hotelJson = result.toJSON()
        let sum = 0
        hotelJson.reviews.forEach(review => {
            sum += review.rating
        })
        const totalReview = hotelJson.reviews.length
        const average = totalReview > 0 ? sum / totalReview : 0
        delete hotelJson.reviews
        return res.json({ ...hotelJson, rating: average});
});



const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Hotel.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Hotel.destroy({ where: {id} });
    return res.sendStatus(204);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}