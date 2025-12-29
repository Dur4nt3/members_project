import { Router } from 'express';

import {
    controllerGetHome,
    controllerGetLogin,
    controllerGetSignup,
    controllerGetMemberAuth,
    controllerGetCreateMessage,
    controllerGetLogout,
    controllerPostSignUp,
    controllerPostLogin,
    controllerPostLogout,
    controllerPostMemberAuth,
    controllerPostCreateMessage
} from '../controllers/indexController.js';

const indexRouter = Router();

// ------------ GET ROUTES ------------

indexRouter.get('/', controllerGetHome);

indexRouter.get('/sign-up', controllerGetSignup);

indexRouter.get('/login', controllerGetLogin);

indexRouter.get('/logout', controllerGetLogout);

indexRouter.get('/member-auth', controllerGetMemberAuth);

indexRouter.get('/create-message', controllerGetCreateMessage);

// ------------ POST ROUTES ------------

indexRouter.post('/sign-up', controllerPostSignUp);

indexRouter.post('/login', controllerPostLogin);

indexRouter.post('/logout', controllerPostLogout);

indexRouter.post('/member-auth', controllerPostMemberAuth);

indexRouter.post('/create-message', controllerPostCreateMessage);

export { indexRouter };
