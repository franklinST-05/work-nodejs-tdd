import { Controller } from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {
    handle(httpRequest: HttpRequest): HttpResponse {
        return {
            statusCode: 400,
        };
    }
}