import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { AccountMongoRepository } from '../../infra/database/mongodb/account-repository/account';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';

export const makeSignUpController = (): SignUpController => {
    const emailValidator = new EmailValidatorAdapter();
    const encrypt = new BcryptAdapter(12);
    const accountRespository = new AccountMongoRepository();
    const addAccount = new DbAddAccount(encrypt, accountRespository);

    return new SignUpController(emailValidator, addAccount);
};