import bcrypt from 'bcrypt';
import { describe, expect, test, vi } from 'vitest';
import { BcryptAdapter } from './bcrypt-adapter';

const bcryptSalt = 12;

const makeSut = (): { sut: BcryptAdapter } => {
    const sut = new BcryptAdapter(bcryptSalt);
    return { sut };
};

describe('criptography', () => {
    test('should call bcrypt with correct values', async () => {
        const { sut } = makeSut();
        const hashSpy = vi.spyOn(bcrypt, 'hash');
        const password = 'qwe123';

        await sut.encrypt(password);
        expect(hashSpy).toHaveBeenCalledWith(password, bcryptSalt);
    });

    test('should return a hash on sucess', async () => {
        vi.spyOn(bcrypt, 'hash').mockImplementationOnce(() => '--HASHED-PASSWORD--');

        const { sut } = makeSut();
        const password = 'qwe123';

        const hash = await sut.encrypt(password);
        expect(hash).toBe('--HASHED-PASSWORD--');
    });

});