import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { validatePassword } from './passwordUtils.js';
import { findUserByName, findUserById } from '../db/queries/indexQueries.js';

async function verifyCallback(username, password, done) {
    try {
        const rows = await (findUserByName(username));
        const user = rows[0];

        if (!user) {
            return done(null, false);
        }

        const passwordMatch = await validatePassword(password, user.password);

        if (passwordMatch) {
            return done(null, user);
        }

        return done(null, false);
    } catch (err) {
        return done(err);
    }
}

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user["user_id"]);
});

passport.deserializeUser(async (userId, done) => {
    try {
        const rows = await findUserById(userId);
        const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
});
