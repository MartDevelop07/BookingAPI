const City = require("./City");
const Hotel = require("./Hotel")
const Images = require("./Images");
const User = require('./User');
const Booking = require('./Booking');
const Review = require('./Reviews');

//Aquí están las relaciones

City.hasMany(Hotel)
Hotel.belongsTo(City)

Images.belongsTo(Hotel)
Hotel.hasMany(Images)


User.hasMany(Booking) 
Booking.belongsTo(User)

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

User.hasMany(Review);
Review.belongsTo(User);

Hotel.hasMany(Review);
Review.belongsTo(Hotel);


