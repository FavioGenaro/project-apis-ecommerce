
const request = require('supertest');
const Server = require('../models/server');
const app = new Server();
// require('dotenv').config();

describe('Pruebas en 02-template-string', () => {
    
    test('getSaludo debe de retornar "Hola Fernando"', () => {
        
        const name = 'Fernando';

        expect( name ).toBe('Fernando') // comparamos

    });

    
    it('GET /api/product', async () => {
        // console.log(app);
        // console.log(app.app);
        const res = await request(app.app)
            .get('/api/product/')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(res.body).toEqual(expect.any(Object));
    });

});