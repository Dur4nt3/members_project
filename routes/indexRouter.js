import { Router } from 'express';

import {
    controllerGetHome,
    controllerGetLogin,
    controllerGetSignup,
    controllerGetMemberAuth,
} from '../controllers/indexController.js';

const indexRouter = Router();

// ------------ GET ROUTES ------------

indexRouter.get('/', controllerGetHome);

indexRouter.get('/login', controllerGetLogin);

indexRouter.get('/sign-up', controllerGetSignup);

indexRouter.get('/member-auth', controllerGetMemberAuth);

// ------------ POST ROUTES ------------

export { indexRouter };
