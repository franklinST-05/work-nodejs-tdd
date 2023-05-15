import { describe, test } from 'vitest';
import request from 'supertest';
import app from '../config/app';

describe('middleware:body-parser', () => {
    test('should return body received with request', async () => {

        app.post('/test_body_parser', (req, res) => res.json(req.body));
        
        await request(app)
            .post('/test_body_parser')
            .send({ name:'John Doe' })
            .expect({ name: 'John Doe' });
    });
});