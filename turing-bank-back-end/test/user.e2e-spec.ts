import { HttpStatus } from '@nestjs/common'
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { RegisterDTO, LoginDTO } from '../src/infra/auth/dto/auth.dto'
import { app, database } from './constants'

beforeAll(async () => {
    const t = await mongoose.connect(database);
    await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
    await mongoose.disconnect(done);
});

describe('AUTH', () => {
    const registerAccount: RegisterDTO = {
        email: "teste@teste.com.br",
        name: "Antônio Flávio Sousa Silva Nascimento Júnior",
        preferredName: "Lord",
        password: "123456",
        cpf: "33366699900"
    };

    const loginAccount: LoginDTO = {
        cpf: "33366699900",
        password: "123456"
    }

    const loginAccountError: LoginDTO = {
        cpf: "33366699900",
        password: "12345"
    }

    let token: string;
    it('Should register user', async () => {
        return request(app)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(registerAccount)
            .expect(({ body }) => {
                expect(body.token).toBeDefined();
                expect(body.user.name).toEqual("Antônio Flávio Sousa Silva Nascimento Júnior");
                expect(body.user.email).toEqual("teste@teste.com.br");
                expect(body.user.preferredName).toEqual("Lord");
                expect(body.password).toBeUndefined();
                expect(body.user.cpf).toEqual("33366699900");
            })
            .expect(HttpStatus.CREATED);
    });

    it('Should reject duplicate registration', () => {
        return request(app)
            .post('/auth/register')
            .set('Accept', 'application/json')
            .send(registerAccount)
            .expect(({ body }) => {
                expect(body.message).toEqual('User already exists');
            })
            .expect(HttpStatus.BAD_REQUEST);
    });

    it('should login user', () => {
        return request(app)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .send(loginAccount)
            .expect(({ body }) => {
                token = body.token;

                expect(body.token).toBeDefined();
                expect(body.user.name).toEqual('Antônio Flávio Sousa Silva Nascimento Júnior');
                expect(body.user.password).toBeDefined();
            })
    })

    it('should not login user', () => {
        return request(app)
            .post('/auth/login')
            .set('Accept', 'application/json')
            .send(loginAccountError)
            .expect(({ body }) => {
                expect(body.code).toEqual(401);
                expect(body.message).toEqual('Invalid credentials');
            })
    })

});
