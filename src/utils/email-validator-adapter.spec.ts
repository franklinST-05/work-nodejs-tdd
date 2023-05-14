/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test, vi, vitest } from 'vitest';
import { EmailValidatorAdapter } from './email-validator';
import validator from 'validator';

const makeSut = () => {
    return {
        sut: new EmailValidatorAdapter(),
    };
};

describe('util:email-validator', async () => {
    test('should return false if invalid email is provided', () => {
        const { sut } = makeSut();
        vitest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
        const isValidEmail = sut.isValid('--INVALID--');
        expect(isValidEmail).toBe(false);
    });

    test('should return true if valid email is provided', () => {
        const { sut } = makeSut();
        vitest.spyOn(validator, 'isEmail').mockReturnValueOnce(true);
        const isValidEmail = sut.isValid('johndoe@gmail.com');
        expect(isValidEmail).toBe(true);
    });

    test('should call EmailValidator with correct email', () => {
        const { sut } = makeSut();
        const validatorEmail = vitest.spyOn(validator, 'isEmail');
        sut.isValid('johndoe@gmail.com');
        expect(validatorEmail).toHaveBeenCalledWith('johndoe@gmail.com');
    });
});