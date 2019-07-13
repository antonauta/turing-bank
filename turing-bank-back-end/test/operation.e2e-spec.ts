import { HttpStatus } from '@nestjs/common'
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { CreateOperationDto } from '../src/operation/dto/create.operation.dto';
import { app, database } from './constants'
import { RegisterDTO } from 'src/infra/auth/dto/auth.dto';

beforeAll(async () => {
    await mongoose.connect(database);
});

afterAll(async done => {
    await mongoose.disconnect(done);
});

describe('OPERATION', () => {

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDI5NWM5ZjM2NDhiYzA1MGNhOTYwZGEiLCJjcGYiOiI0NjE5MTE0NzgyMSIsIm5hbWUiOiJBbnTDtG5pbyIsImVtYWlsIjoiYW50b25pb0B1bmlzYW50b3MuYnIiLCJwcmVmZXJyZWROYW1lIjoiQW50w7RuaW8iLCJhY2NvdW50IjoyLCJhZ2VuY3kiOiIwMSIsImlhdCI6MTU2Mjk5MTc3NSwiZXhwIjoxNTYzMDM0OTc1fQ.z2MCYx0WNfsJGE71CoP9bkbQTNbZURkW2lUZLMx94hM";

    const operationDeposit: CreateOperationDto = {
        type: 0,
        value: 100
    };

    const registerAccount: RegisterDTO = {
        email: "teste@teste.com.br",
        name: "Antônio Flávio Sousa Silva Nascimento Júnior",
        preferredName: "Lord",
        password: "123456",
        cpf: "33366699901"
    };

    const operationTranfer: CreateOperationDto = {
        type: 1,
        value: 100,
        destination: "5d295a9c3648bc050ca960d8"
    };
    describe('OPERATION', () => {
        it('Should register operation', async () => {
            let token = ""
            await request(app).post('/auth/register').set('Accept', 'application/json').send(registerAccount)
                .expect(({ body }) => {
                    token = body.token;
                })
            return request(app)
                .post('/operation')
                .set('Authorization', `bearer ${token}`)
                .set('Accept', 'application/json')
                .send(operationDeposit)
                .expect(({ body }) => {
                    expect(body.value).toEqual(100)

                })
        })
    })
});
