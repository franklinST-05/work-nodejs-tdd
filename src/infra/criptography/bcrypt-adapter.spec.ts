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
        const hashSpy = vi.spyOn(bcrypt, 'hash');
        const password = 'qwe123';

        await sut.encrypt(password);
        expect(hashSpy).toHaveBeenCalledWith(password, salt);
    });

    test('should return a hash on sucess', async () => {
        const salt = 12;
        vi.spyOn(bcrypt, 'hash').mockImplementationOnce(() => '--HASHED-PASSWORD--');
        
        const { sut } = makeSut(salt);
        const password = 'qwe123';

        const hash = await sut.encrypt(password);
        expect(hash).toBe('--HASHED-PASSWORD--');
    });
});