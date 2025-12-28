import { Router } from 'express';

import { controllerGetHome, controllerGetLogin, controllerGetSignup } from '../controllers/indexController.js';

const indexRouter = Router();

// ------------ GET ROUTES ------------

indexRouter.get('/', controllerGetHome);

indexRouter.get('/login', controllerGetLogin);

indexRouter.get('/sign-up', controllerGetSignup);

// ------------ POST ROUTES ------------

export { indexRouter };
