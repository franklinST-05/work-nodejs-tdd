import { Controller, EmailValidator, AddAccount, HttpRequest, HttpResponse } from './signup-protocols';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, ok, serverError } from '../../helpers/http-helper';

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

            const account = this.addAcount.run({
                name,
                email,
                password
            });

            return ok(account);

        } catch (error) {
            return serverError(new Error('Internal server error'));
        }
    }
}