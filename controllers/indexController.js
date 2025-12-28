import { getAllPosts } from '../db/queries/indexQueries.js';

export async function controllerGetHome(req, res) {
    const posts = await getAllPosts();

    let member = false;

    if (req.isAuthenticated()) {
        member = req.user.member;
    }

    res.render('index', { posts, authenticated: req.isAuthenticated(), member });
}

export async function controllerGetLogin(req, res) {
    res.render('login');
}

export async function controllerGetSignup(req, res) {
    res.render('signup');
}