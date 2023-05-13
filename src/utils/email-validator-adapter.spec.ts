import { describe, expect, test } from 'vitest';
import { EmailValidatorAdapter } from './email-validator';

const makeSut = () => {
    const sut = new EmailValidatorAdapter();
    return { sut };
};

describe('util:email-validator', () => {
    test('should return false if invalid email is provided', () => {
        const { sut } = makeSut();
        const isValidEmail = sut.isValid('--INVALID--');
        expect(isValidEmail).toBe(false);
    });
});