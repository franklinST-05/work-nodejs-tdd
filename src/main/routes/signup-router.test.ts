import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { setup, teardown } from 'vitest-mongodb';
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongo-helper';
import app from '../config/app';

beforeAll(async () => {
    await setup();
    await MongoHelper.connect();
});

afterAll(async () => {
    await MongoHelper.disconnect();
    await teardown();
});

describe('route:signup', () => {
    test('should return an account on success', async () => {
        const _res = await request(app)
            .post('/api/signup')
            .send({
                name:'John Doe',
                email:'johndoe@gmail.com',
                password:'qwe123',
                confirmPassword:'qwe123'
            });

        expect(_res.statusCode).toBe(200);
    });
});