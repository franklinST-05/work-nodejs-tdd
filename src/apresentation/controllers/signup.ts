import { MissingParamError } from '../errors/missing-param-error';
import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        return {
            statusCode: 400,
            body: new MissingParamError('name')
        };
    }
}