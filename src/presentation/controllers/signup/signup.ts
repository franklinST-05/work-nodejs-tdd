import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http-helper';
import { Controller } from '../../protocols/controller';
import { EmailValidator } from '../../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { AddAccount } from '../../../domain/usecases/add-account';

export class SignUpController implements Controller {

    private readonly emailValidator: EmailValidator;
    private readonly addAcount: AddAccount;

    constructor(emailValidator: EmailValidator, addAcount: AddAccount) {
        this.emailValidator = emailValidator;
        this.addAcount = addAcount;
    }

    handle(httpRequest: HttpRequest): HttpResponse {

        try {

            const fields = ['name', 'email', 'password', 'confirmPassword'];

            for (const field of fields) {

                if (!httpRequest.body[field]) {
                    return badRequest(new MissingParamError(field));
                }
            }

            const { name, email, password, confirmPassword } = httpRequest.body;

            if (password != confirmPassword) {
                return badRequest(new InvalidParamError('confirmPassword'));
            }

            if (!this.emailValidator.isValid(email)) {
                return badRequest(new InvalidParamError('email'));

            }

            this.addAcount.run({
                name,
                email,
                password
            });

            return {
                statusCode: 200,
            };

        } catch (error) {
            return {
                statusCode: 500,
                body: error
            };
        }
    }
}