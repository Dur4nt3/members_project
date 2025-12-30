import { Router } from 'express';

import {
    controllerGetHome,
    controllerGetLogin,
    controllerGetSignup,
    controllerGetMemberAuth,
    controllerGetCreateMessage,
    controllerGetLogout,
    controllerGetDeleteMessage,
    controllerPostSignUp,
    controllerPostLogin,
    controllerPostLogout,
    controllerPostMemberAuth,
    controllerPostCreateMessage,
    controllerPostDeleteMessage,
} from '../controllers/indexController.js';

const indexRouter = Router();

// ------------ GET ROUTES ------------

indexRouter.get('/', controllerGetHome);

indexRouter.get('/sign-up', controllerGetSignup);

indexRouter.get('/login', controllerGetLogin);

indexRouter.get('/logout', controllerGetLogout);

indexRouter.get('/member-auth', controllerGetMemberAuth);

indexRouter.get('/create-message', controllerGetCreateMessage);

indexRouter.get('/delete-message/:postId', controllerGetDeleteMessage);

// ------------ POST ROUTES ------------

indexRouter.post('/sign-up', controllerPostSignUp);

indexRouter.post('/login', controllerPostLogin);

indexRouter.post('/logout', controllerPostLogout);

indexRouter.post('/member-auth', controllerPostMemberAuth);

indexRouter.post('/create-message', controllerPostCreateMessage);

indexRouter.post('/delete-message/:postId', controllerPostDeleteMessage);

export { indexRouter };
