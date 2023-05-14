/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test, vi } from 'vitest';
import { Encrypter, AddAccount, AddAccountModel, AccountModel, AddAccountRepository } from './db-add-account-protocols';
import { DbAddAccount } from './db-add-account';


const makeAddAccountRepositoryStub = (): AddAccountRepository => {
    class AddAccountRepositoryStub {
        async add(account: AddAccountModel): Promise<AccountModel> {
            const fakeAccount: AccountModel = {
                id: '--ID--',
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: 'hash'
            };
            return new Promise(resolve => resolve(fakeAccount));
        }
    }

    return new AddAccountRepositoryStub();
};

const makeEncryptStub = (): Encrypter => {
    class EncryptStub implements Encrypter {
        async encrypt(value: string): Promise<string> {
            return new Promise(resolve => resolve('hash'));
        }
    }

    return new EncryptStub();
};

const makeSut = (): { sut: AddAccount, encryptStub: Encrypter, addAccountRepositoryStub: AddAccountRepository } => {
    const encryptStub = makeEncryptStub();
    const addAccountRepositoryStub = makeAddAccountRepositoryStub();
    const sut: AddAccount = new DbAddAccount(encryptStub, addAccountRepositoryStub);
    return { sut, encryptStub, addAccountRepositoryStub };
};

describe('data-usecase:add-account', () => {
    test('should call Encrypter with correct password', () => {
        const { sut, encryptStub } = makeSut();
        const encryptSpy = vi.spyOn(encryptStub, 'encrypt');
        const accountData: AddAccountModel = {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
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
            email: 'johndoe@gmail.com',
            password: 'qwe123',
        };
        const account = sut.run(accountData);
        expect(account).rejects.toThrow();
    });

    test('should call addAccountRepository with correct object', async () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        const addAccountRepositorySpy = vi.spyOn(addAccountRepositoryStub, 'add');
        const accountData: AddAccountModel = {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'qwe123',
        };
        await sut.run(accountData);
        expect(addAccountRepositorySpy).toHaveBeenCalledWith(Object.assign({}, accountData, { password: 'hash' }));
    });

    test('should throw if AddAccountRepository throws', () => {
        const { sut, addAccountRepositoryStub } = makeSut();
        vi.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((_, reject) => reject(new Error('--ERROR--'))));
        const accountData: AddAccountModel = {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'qwe123',
        };
        const account = sut.run(accountData);
        expect(account).rejects.toThrow();
    });
});