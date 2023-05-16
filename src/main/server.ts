import app from './config/app';
import { MongoHelper } from '../infra/database/mongodb/helpers/mongo-helper';
import env from './config/env';

MongoHelper.connect(env.mongoUrl)
    .then(() => {
        app.listen(env.port, () => {
            console.log(env.port, 'Server is running...');
        });
    })
    .catch((e) => console.log(e));