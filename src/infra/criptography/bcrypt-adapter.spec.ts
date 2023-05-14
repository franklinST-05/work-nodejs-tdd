import bcrypt from 'bcrypt';
import { describe, expect, test, vi } from 'vitest';
import { BcryptAdapter } from './bcrypt-adapter';

const makeSut = (salt:number): { sut: BcryptAdapter } => {
    const sut = new BcryptAdapter(salt);
    return { sut };
};

describe('criptography', () => {
    test('should call bcrypt with correct values', async () => {
        const salt = 12;
        const { sut } = makeSut(salt);
        const hashSpy = vi.spyOn(bcrypt, 'hashSync');
        const password = 'qwe123';

        await sut.encrypt(password);
        expect(hashSpy).toHaveBeenCalledWith(password, salt);
    });
});