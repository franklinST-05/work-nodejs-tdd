import { describe, expect, test } from 'vitest';
import { SignUpController } from './signup';
import { HttpRequest } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';

const makeSUT = () => {
    const sut = new SignUpController();
    return { sut };
};

describe('controller:signup', () => {

    test('should returns 400 if no name is provided', () => {
        const { sut } = makeSUT();
        const httpRequest: HttpRequest = {
            body: {
                // name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: 'qwe123',
                confirmPassword: 'qwe123'
            }
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('name'));
    });


    test('should returns 400 if no email is provided', () => {
        const { sut } = makeSUT();
        const httpRequest: HttpRequest = {
            body: {
                name: 'John Doe',
                // email: 'johndoe@gmail.com',
                password: 'qwe123',
                confirmPassword: 'qwe123'
            }
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('email'));
    });

    test('should returns 400 if no password is provided', () => {
        const { sut } = makeSUT();
        const httpRequest: HttpRequest = {
            body: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                // password: 'qwe123',
                confirmPassword: 'qwe123'
            }
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('password'));
    });

    test('should returns 400 if no confirm password is provided', () => {
        const { sut } = makeSUT();
        const httpRequest: HttpRequest = {
            body: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: 'qwe123',
                // confirmPassword: 'qwe123'
            }
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'));
    });

});