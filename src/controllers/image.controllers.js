const catchError = require('../utils/catchError');
const Images = require('../models/Images');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');
const Hotel = require('../models/Hotel');

const getAll = catchError(async(req, res) => {
    const images = await Images.findAll({include: [Hotel]})
    return res.json(images)
});

const create = catchError(async(req, res) => {
    const { url } = await uploadToCloudinary(req.file)
    const { hotelId } = req.body
    const image = await Images.create({url, hotelId})
    return res.status(201).json(image)
})

const remove = catchError(async(req, res) => {
    const { id } = req.params
    const image = await Images.findByPk(id)
    if(!image) return res.sendStatus(404).json({ message: 'Image not found'});
    await deleteFromCloudinary(image.url)
    await image.destroy()
    return res.sendStatus(204);
})

module.exports = {
    getAll,
    create,
    remove
}