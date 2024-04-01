const request = require('supertest')
const app = require('../app')

let id;
let token;

beforeAll(async () => {
    const res = await request(app).post('/users/login').send({
       email: "test@gmail.com",
       password: "test1234"
    })
    token = res.body.token
})

test('GET/ hotels debe mostrar todos los hoteles ', async () => {
    const res = await request(app).get('/hotels')
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST/ hotels debe crear un hotel', async () => {
    const body = {
    name: "RIU",
    description: "La línea de hoteles urbanos RIU Plaza destaca por contar con excelentes ubicaciones en el centro de las ciudades más emblemáticas del mundo, como Nueva York, San Francisco, Madrid, Londres, Miami Beach, Dublín, Guadalajara, Berlín o Ciudad de Panamá, combinando a la perfección modernidad, estilo y confort.",
    price: 1570,
    address: "Av. Adolfo López Mateos Sur 830, Chapalita, 44500 Guadalajara, Jal, México",
    lat: 35.8090473664,
    lon: 200.348641089383
    }
    const res = await request(app).post('/hotels').send(body).set('Authorization', `Bearer ${token}`)
    id = res.body.id
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT/ hotels/:id debe modificar un hotel por id', async () => {
    const body = {
        address: "dirección actualizada"
    }
    const res = await request(app).put(`/hotels/${id}`).send(body).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200);
    expect(res.body.address).toBe(body.address);
});

test('DELETE/ hotels/:id debe eliminar un hotel por id', async () => {
    const res = await request(app).delete(`/hotels/${id}`).set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204);
});