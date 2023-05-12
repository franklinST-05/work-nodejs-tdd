import { describe, expect, test, vitest } from 'vitest';
import { SignUpController } from './signup';
import { HttpRequest } from '../protocols/http';
import { MissingParamError } from '../errors/missing-param-error';
import { InvalidParamError } from '../errors/invalid-param-error';
import { EmailValidator } from '../protocols/email-validator';

const makeEmailValidator = () => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true;
        }
    }

    const emailValidatorStub = new EmailValidatorStub();
    return { emailValidatorStub };
};

const makeSUT = () => {
    const { emailValidatorStub } = makeEmailValidator();
    const sut = new SignUpController(emailValidatorStub);
    return { sut, emailValidatorStub };
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

    test('should returns 400 if invalid email is provided', () => {
        const { sut, emailValidatorStub  } = makeSUT();
        vitest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

        const httpRequest: HttpRequest = {
            body: {
                name: 'John Doe',
                email: '--invalid--',
                password: 'qwe123',
                confirmPassword: 'qwe123'
            }
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('email'));
    });

    test('should call EmailValidator with correct email', () => {
        const { sut, emailValidatorStub  } = makeSUT();
        const emailValidatorSpy = vitest.spyOn(emailValidatorStub, 'isValid');

        const httpRequest: HttpRequest = {
            body: {
                name: 'John Doe',
                email: 'johndoe@gamil.com',
                password: 'qwe123',
                confirmPassword: 'qwe123'
            }
        };
        
        sut.handle(httpRequest);
        expect(emailValidatorSpy).toBeCalledWith(httpRequest.body.email);
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

    test('should returns 400 if confirm password not equal password', () => {
        const { sut } = makeSUT();
        const httpRequest: HttpRequest = {
            body: {
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: 'qwe123',
                confirmPassword: '--invalid--'
            }
        };
        const httpResponse = sut.handle(httpRequest);
        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new InvalidParamError('confirmPassword'));
    });

});