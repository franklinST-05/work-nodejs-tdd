import { Router } from 'express';
import { makeSignUpController } from '../factories/signup';
import { adapterRoute } from '../adapters/express-router-adapter';

export default (router: Router): void => {
    router.post('/signup', adapterRoute(makeSignUpController()));
};