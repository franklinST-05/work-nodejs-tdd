import { Express, Router } from 'express';
import fg from 'fast-glob';

export const setupRoutes = async (app: Express) => {
    const router = Router();
    app.use('/api', router);

    const fileRoutes = fg.sync('**/src/main/routes/*router.ts');

    for (const filepath of fileRoutes) {
        const module = await import(`../../../${filepath}`);
        const route = module.default;

        if(typeof router === 'function') route(router);
    }

};