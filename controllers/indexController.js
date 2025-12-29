import passport from 'passport';
import { validationResult, matchedData } from 'express-validator';

import { generatePassword } from '../auth/passwordUtils.js';
import { getAllPosts, createUser } from '../db/queries/indexQueries.js';
import { validateSignUp } from './validationUtils.js';

// ------------ GET ROUTES ------------

export async function controllerGetHome(req, res) {
    const posts = await getAllPosts();

    let member = false;
    let name = null;
    let username = null;

    if (req.isAuthenticated()) {
        member = req.user.member;
        username = req.user.username;
        name = `${req.user['first_name']} ${req.user['last_name']}`;
    }

    res.render('index', {
        posts,
        authenticated: req.isAuthenticated(),
        member,
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
    res.render('memberAuth');
}

export async function controllerGetCreateMessage(req, res) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
        return;
    }

    res.render('createMessage');
}

export async function controllerGetLogout(req, res) {
    res.render('logout', { authenticated: req.isAuthenticated() });
}

// ------------ POST ROUTES ------------

const controllerPostSignUp = [
    validateSignUp,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
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
    req.logout((err) => {
        if (err) {
            console.log('Could not logout user: ', err);
            return;
        }
        res.redirect('/');
    });
}

export { controllerPostSignUp };
