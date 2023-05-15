/* eslint-disable @typescript-eslint/no-unused-vars */
import { afterAll, beforeAll, describe, expect, test } from 'vitest';
import { setup, teardown } from 'vitest-mongodb';
import { AccountMongoRepository } from './account';
import { MongoHelper } from '../helpers/mongo-helper';

beforeAll(async () => {
    await setup();
    await MongoHelper.connect();
});

afterAll(async () => {
    await MongoHelper.disconnect();
    await teardown();
});


describe('mongodb:account', () => {

    test('should return an account on success', async () => {
    
        const sut = new AccountMongoRepository();
        const fakeNewAccount = {
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'qwe123',
        };
        const account = await sut.add(fakeNewAccount);

        expect(account).toBeTruthy();
        expect(account.name).toBe(fakeNewAccount.name);
        expect(account.email).toBe(fakeNewAccount.email);
        expect(account.password).toBe(fakeNewAccount.password);
    });
});