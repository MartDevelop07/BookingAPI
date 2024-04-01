const request = require('supertest');
const app = require('../app');

let id;
let token;
//test post se pasa al primer lugar porque se requiere tener creado un usuario para hacer login
test('POST /users debe crear un usuario', async () => {
    const body = {
        
            firstName: "Ari",
            lastName: "Butera",
            email: "ary2024@gmail.com",
            password: "but1234",
            gender: "female"
        
    }
    const res = await request(app).post('/users').send(body);
    id = res.body.id;
    //console.log(res.body); en caso de error 400 o 500
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(body.firstName);
    expect(res.body.id).toBeDefined();

    
});


//test endpoint login se pasa en segundo lugar
test('POST /users/login debe hacer un login', async () => {
    const body = {
    
        email: "ary2024@gmail.com",
        password: "but1234"
    }
const res = await request(app).post('/users/login').send(body);
token = res.body.token; //para configurar el token
expect(res.status).toBe(200);
expect(res.body.token).toBeDefined();
expect(res.body.user.email).toBe(body.email);
});

test('GET /users debe traer todos los usuarios', async () => {
    const res =  await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${token}`); //configuración token en todos los nedpoints protegidos
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});


test('put /users/:id debe actualizar un usuario', async () => {
    const body = {
 
        firstName: "Ariana updated"    
} 

const res = await request(app).put(`/users/${id}`)
.send(body)
.set('Authorization', `Bearer ${token}`); //configuración token en todos los nedpoints protegidos
expect(res.status).toBe(200);
expect(res.body.firstName).toBe(body.firstName);
});


//test para que login envie error si las credenciales son incorrectas
test ('POST /users/login con credenciales inválidas debe enviar error', async () => {
    const body = {
    
        email: "ary2024@gmail.com",
        password: "5959493",
    }
    const res = await request(app).post('/users/login').send(body);
    expect(res.status).toBe(401);
})


test('DELETE /users/:id debe eliminar un usuario', async () => {
    const res = await request(app)
    .delete(`/users/${id}`)
    .set('Authorization', `Bearer ${token}`); //configuración token en todos los nedpoints protegidos
    expect(res.status).toBe(204); //debe retornar 204 porque no retornará contenido, a diferencia de un 200 que si genera y mustra contenido
});