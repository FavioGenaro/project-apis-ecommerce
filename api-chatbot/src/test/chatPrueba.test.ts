import {describe, expect, test} from '@jest/globals';
import { Server } from './../presentation/server'
import { envs } from './../config';
import { AppRoutes } from '../presentation/routes';
import request from 'supertest'

const app = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
});

describe('Pruebas en 02-template-string', () => {
    
    test('getSaludo Mensaje de prueba"', () => {
        
        const name = '123';

        expect( name ).toBe('123') // comparamos

    });

    
    it('POST /api/chatPrueba', async () => {
        // console.log(app);
        // console.log(app.app);
        const res = await request(app.app)
            .post('/api/chatPrueba')
            .send({
                inputUser: "Hola mundo"
            })
            .expect('Content-Type', /json/)
            .expect(200);
            // .expect('Content-Type', "text/html; charset=utf-8")
            // .expect(404);
        expect(res.body).toEqual(expect.any(Object));
    });

});
