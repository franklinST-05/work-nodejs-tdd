import { MissingParamError } from '../errors/missing-param-error';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {

        const fields = ['name', 'email', 'password'];

        for (const field of fields) {

            if (!httpRequest.body[field]) {
                return {
                    statusCode: 400,
                    body: new MissingParamError(field)
                };
            }
        }

        return {
            statusCode: 200,
        };
    }
}