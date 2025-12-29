import { Router } from 'express';

import {
    controllerGetHome,
    controllerGetLogin,
    controllerGetSignup,
    controllerGetMemberAuth,
    controllerGetCreateMessage,
    controllerPostSignUp
} from '../controllers/indexController.js';

const indexRouter = Router();

// ------------ GET ROUTES ------------

indexRouter.get('/', controllerGetHome);

indexRouter.get('/login', controllerGetLogin);

indexRouter.get('/sign-up', controllerGetSignup);

indexRouter.get('/member-auth', controllerGetMemberAuth);

indexRouter.get('/create-message', controllerGetCreateMessage);

// ------------ POST ROUTES ------------

indexRouter.post('/sign-up', controllerPostSignUp);

export { indexRouter };
