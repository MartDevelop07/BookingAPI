const sequelize = require('../utils/connection');
const request = require('/supertest');
const User = require('../models/User');
const app = require('../app');

const main = async() => {
    try{
        // Acciones a ejecutar antes de los tests
        sequelize.sync();
        const user = {
            firstName: 'Test',
            lastName: 'Test',
            email: "test@gmail.com",
            password: "test1234",
            gender: "female"
        }

        const userTest = await User.findOne({where: {email: "test@gmail.com"}})
        if(!userTest) {
            await request(app).post('/users').send(user)
        }
      
        process.exit();
    } catch(error){
        console.log(error);
    }
}

main();