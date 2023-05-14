import { AddAccount, Encrypter, AddAccountModel, AccountModel, AddAccountRepository, } from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {

    private readonly encrypter: Encrypter;
    private readonly addAccountRepository: AddAccountRepository;

    constructor(encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
        this.encrypter = encrypter;
        this.addAccountRepository = addAccountRepository;
    }

    async run(account: AddAccountModel): Promise<AccountModel> {
        const hashedPassword = await this.encrypter.encrypt(account.password);
        const savedAccount = await this.addAccountRepository.add({
            name: account.name,
            email: account.email,
            password: hashedPassword,
        });
        return new Promise(resolve => resolve(savedAccount));
    }

}