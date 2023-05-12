import { InvalidParamError } from '../errors/invalid-param-error';
import { MissingParamError } from '../errors/missing-param-error';
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
                return {
                    statusCode: 400,
                    body: new MissingParamError(field)
                };
            }
        }

        if (httpRequest.body.password != httpRequest.body.confirmPassword) {
            return {
                statusCode: 400,
                body: new InvalidParamError('confirmPassword')
            };
        }

        if (!this.emailValidator.isValid(httpRequest.body.email)) {
            return {
                statusCode: 400,
                body: new InvalidParamError('email')
            };
        }

        return {
            statusCode: 200,
        };
    }
}