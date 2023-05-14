/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, test, vi } from 'vitest';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account';
import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

const makeEncryptStub = () => {
    class EncryptStub implements Encrypter {
        async encrypt(value:string):Promise<string> {
            return new Promise(resolve => resolve('hash'));
        }
    }

    return new EncryptStub();
};

const makeSut = () => {
    const encryptStub = makeEncryptStub();
    const sut:AddAccount = new DbAddAccount(encryptStub);
    return { sut, encryptStub };
};

describe('data-usecase:add-account', () => {
    test('should call Encrypter with correct password', () => {
        const { sut, encryptStub } = makeSut();
        const encryptSpy = vi.spyOn(encryptStub, 'encrypt');
        const accountData:AddAccountModel = {
            name: 'John Doe',
            email: 'joedoe@gmail.com',
            password: 'qwe123',
        };
        sut.run(accountData);
        expect(encryptSpy).toHaveBeenCalledWith(accountData.password);
    });
});