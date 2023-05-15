import { describe, test } from 'vitest';
import request from 'supertest';
import app from '../config/app';

describe('middleware:cors', () => {
    test('should enable *CORS*', async () => {

        app.get('/test_cors', (req, res) => res.send());
        
        await request(app)
            .get('/test_body_parser')
            .expect('access-control-allow-origin','*');
    });
});