import { validationResult, matchedData } from 'express-validator';

import { generatePassword } from '../auth/passwordUtils.js';
import { getAllPosts, createUser } from '../db/queries/indexQueries.js';
import { validateSignUp } from './validationUtils.js';

// ------------ GET ROUTES ------------

export async function controllerGetHome(req, res) {
    const posts = await getAllPosts();

    let member = false;

    if (req.isAuthenticated()) {
        member = req.user.member;
    }

    res.render('index', {
        posts,
        authenticated: req.isAuthenticated(),
        member,
    });
}

export async function controllerGetLogin(req, res) {
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

export { controllerPostSignUp };
