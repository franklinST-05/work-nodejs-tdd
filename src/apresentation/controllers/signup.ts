import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest } from '../helpers/http-helper';
import { Controller } from '../protocols/controller';
import { EmailValidator } from '../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {

    private readonly emailValidator: EmailValidator;

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator;
    }

    handle(httpRequest: HttpRequest): HttpResponse {

        const fields = ['name', 'email', 'password', 'confirmPassword'];

        for (const field of fields) {

            if (!httpRequest.body[field]) {
                return badRequest(new MissingParamError(field));
            }
        }

        if (httpRequest.body.password != httpRequest.body.confirmPassword) {
            return badRequest(new InvalidParamError('confirmPassword'));
        }

        if (!this.emailValidator.isValid(httpRequest.body.email)) {
            return badRequest(new InvalidParamError('email'));

        }

        return {
            statusCode: 200,
        };
    }
}