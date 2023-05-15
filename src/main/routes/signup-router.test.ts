import request from 'supertest';
import { afterAll, beforeAll, describe, test } from 'vitest';
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
        await request(app)
            .post('/api/signup')
            .expect(200);
    });
});