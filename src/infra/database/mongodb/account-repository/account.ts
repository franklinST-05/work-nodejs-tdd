import { AddAccountRepository } from '../../../../data/protocols/add-account-repository';
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import { MongoHelper } from '../helpers/mongo-helper';

export class AccountMongoRepository implements AddAccountRepository {
    async add(account: AddAccountModel): Promise<AccountModel> {

        const accountCollection = MongoHelper.getCollection('accounts');
        const result = await accountCollection.insertOne(account);
    
        return {
            id: result.insertedId.toString(),
            name: account.name,
            email: account.email,
            password: account.password,
        };
    }

}