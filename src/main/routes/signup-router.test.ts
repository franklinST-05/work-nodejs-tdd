import request from 'supertest';
import { describe, test } from 'vitest';
import app from '../config/app';

describe('route:signup', () => {
    test('should return an account on success', async () => {
        await request(app)
            .post('/api/signup')
            .expect(200);
    });
});