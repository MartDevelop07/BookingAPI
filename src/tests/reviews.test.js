const request = require('supertest');
const app = require('../app');

let token;
let id;

beforeAll(async()=>{
    const res = await request(app).post('/users/login').send({
        email:'test@gmail.com',
        password:'test1234'
    });
   token = res.body.token;
});

test('Get /reviews debe mostrar todas las opiniones que hayan escrito los clientes', async () => {
    const res = await request(app).get('/reviews');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
});

test('POST /reviews debe permitir a un cliente que esté logueado pueda crear una opinión', async () => {
    const body = {
        rating: 5,
        comment:'excelente',
        hotelId:1
    };
    const res = await request(app)
        .post('/reviews')
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    id = res.body.id;
    console.log(res.body);

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.rating).toBe(body.rating);
});

test('PUT /reviews/:id debe permitir que un cliente que esté logueado pueda modificar su opinión', async () => {
    const body ={
        rating: 5
    };
    const res = await request(app).put(`/reviews/${id}`)
        .send(body)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(body.rating);
});

test('DELETE /reviews/:id debe permitir que un cliente que esté logueado elimine su opinión', async () => {
    const res = await request(app)
        .delete(`/reviews/${id}`)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
});