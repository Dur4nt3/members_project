import passport from 'passport';
import { validationResult, matchedData } from 'express-validator';

import { generatePassword } from '../auth/passwordUtils.js';
import {
    getAllPosts,
    createUser,
    provideMemberStatus,
    provideAdminStatus,
    createMessage,
    getPostById,
    verifyPostOwnership,
    deletePost,
} from '../db/queries/indexQueries.js';
import {
    validateSignUp,
    validateMemberKey,
    validateAdminKey,
    validatePost,
} from './validationUtils.js';

// ------------ GET ROUTES ------------

export async function controllerGetHome(req, res) {
    const posts = await getAllPosts();

    let member = false;
    let admin = false;
    let userId = null;
    let username = null;
    let name = null;

    if (req.isAuthenticated()) {
        member = req.user.member;
        admin = req.user.admin;
        userId = req.user['user_id'];
        username = req.user.username;
        name = `${req.user['first_name']} ${req.user['last_name']}`;
    }

    res.render('index', {
        posts,
        authenticated: req.isAuthenticated(),
        member,
        admin,
        userId,
        username,
        name,
    });
}

export async function controllerGetLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('/');
        return;
    }

    res.render('login');
}

export async function controllerGetSignup(req, res) {
    res.render('signup');
}

export async function controllerGetMemberAuth(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
        return;
    }

    res.render('memberAuth');
}

export async function controllerGetCreateMessage(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
        return;
    }

    res.render('createMessage', { member: req.user.member });
}

export async function controllerGetLogout(req, res) {
    res.render('logout', { authenticated: req.isAuthenticated() });
}

export async function controllerGetDeleteMessage(req, res) {
    const post = await getPostById(req.params.postId);

    res.render('deleteMessage', { post, authenticated: req.isAuthenticated() });
}

// ------------ POST ROUTES ------------

const controllerPostSignUp = [
    validateSignUp,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('signup', {
                errors: errors.array(),
                username: req.body.username,
                fname: req.body.fname,
                lname: req.body.lname,
            });
        }

        const { username, fname, lname, password } = matchedData(req);
        const hashedPassword = await generatePassword(password);

        await createUser(username, hashedPassword, fname, lname);

        res.redirect('/login');
    },
];

function controllerPassportLogin(req, res, err, user, info) {
    if (!user) {
        res.render('login', {
            errors: [{ msg: 'Incorrect username or password' }],
        });
        return;
    }

    req.login(user, (err) => {
        if (err) {
            console.log('Could not authenticate user: ', err);
            return;
        }

        res.redirect('/');
    });
}

export function controllerPostLogin(req, res) {
    passport.authenticate('local', (err, user, info) =>
        controllerPassportLogin(req, res, err, user, info),
    )(req, res);
}

export function controllerPostLogout(req, res) {
    if (!req.isAuthenticated()) {
        return;
    }

    req.logout((err) => {
        if (err) {
            console.log('Could not logout user: ', err);
            return;
        }
        res.redirect('/');
    });
}

export async function controllerPostMemberAuth(req, res) {
    if (!req.isAuthenticated()) {
        return;
    }

    if (validateMemberKey(req.body.key)) {
        if (req.user.member === true) {
            res.redirect('/');
            return;
        }

        await provideMemberStatus(req.user['user_id']);
        res.redirect('/');
        return;
    }

    if (validateAdminKey(req.body.key)) {
        if (req.user.admin === true) {
            res.redirect('/');
            return;
        }

        await provideAdminStatus(req.user['user_id']);
        res.redirect('/');
        return;
    }

    res.render('memberAuth', {
        errors: [{ msg: 'Incorrect member/admin key!' }],
    });
}

const controllerPostCreateMessage = [
    validatePost,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('createMessage', {
                member: req.user.member,
                errors: errors.array(),
                title: req.body.title,
                body: req.body.body,
            });
        }

        const { title, body } = matchedData(req);

        const currentTimestamp = new Date()
            .toISOString()
            .substring(0, 19)
            .replace('T', ' ');

        await createMessage(title, body, currentTimestamp, req.user['user_id']);

        res.redirect('/');
    },
];

export async function controllerPostDeleteMessage(req, res) {
    let isPostOwner = false;

    if (req.user.admin === true) {
        isPostOwner = true;
    } else {
        isPostOwner = await verifyPostOwnership(
            req.params.postId,
            req.user['user_id'],
        );
    }

    if (!isPostOwner) {
        const post = await getPostById(req.params.postId);

        res.render('deleteMessage', {
            errors: [{ msg: 'You are not permitted to delete this message!' }],
            post,
            authenticated: req.isAuthenticated(),
        });
        return;
    }

    await deletePost(req.params.postId);
    res.redirect('/');
}

export { controllerPostSignUp, controllerPostCreateMessage };
