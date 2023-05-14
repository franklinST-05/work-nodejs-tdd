/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test, vi } from 'vitest';
import { Encrypter, AddAccount, AddAccountModel } from './db-add-account-protocols';
import { DbAddAccount } from './db-add-account';


const makeEncryptStub = (): Encrypter => {
    class EncryptStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hash'));
        }
    }

    return new EncryptStub();
};

const makeSut = (): { sut: AddAccount, encryptStub: Encrypter } => {
    const encryptStub = makeEncryptStub();
    const sut: AddAccount = new DbAddAccount(encryptStub);
    return { sut, encryptStub };
};

describe('data-usecase:add-account', () => {
    test('should call Encrypter with correct password', () => {
        const { sut, encryptStub } = makeSut();
        const encryptSpy = vi.spyOn(encryptStub, 'encrypt');
        const accountData: AddAccountModel = {
            name: 'John Doe',
            email: 'joedoe@gmail.com',
            password: 'qwe123',
        };
        sut.run(accountData);
        expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
    });

    test('should throw if Encryoter throws', () => {
        const { sut, encryptStub } = makeSut();
        vi.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(new Promise((_, reject) => reject(new Error('--ERROR--'))));
        const accountData: AddAccountModel = {
            name: 'John Doe',
            email: 'joedoe@gmail.com',
            password: 'qwe123',
        };
        const account = sut.run(accountData);
        expect(account).rejects.toThrow();
    });
});