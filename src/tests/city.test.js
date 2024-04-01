const request = require('supertest');
const app = require('../app');

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
         email: "test@gmail.com",
        password: "test1234"
      
    })
    token = res.body.token
})

test('POST /cities debe crear una ciudad', async () => {
    const body = {
        name: "Toronto",
        country: "Canada",
        countryId: "can"
    }
    const res = await request(app).post('/cities')
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(body.name);
    expect(res.body.id).toBeDefined();
});


test('GET/ cities debe retornar todo las ciudades ', async () => {
    const res = await request(app).get('/cities')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});



test('PUT /city/:id debe retornar una ciudad modificada por id', async () => {
    const body = {
        name: "Vancouver actualizado", 
    }
    const res = await request(app).put(`/city/${id}`)
    .send(body)
    .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test('DELETE /city/:id se eliminarán ciudades por su id', async () => {
    const res = await request(app)
    .delete(`/city/${id}`) 
    .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});