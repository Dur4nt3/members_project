import 'dotenv/config';

import dbPool from './db/dbPool.js';

import path from 'path';
import express from 'express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import passport from 'passport';

import './auth/passportConfig.js';

import { indexRouter } from './routes/indexRouter.js';

const __dirname = import.meta.dirname;

const pgSession = connectPgSimple(session);

const app = express();

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(
    session({
        store: new pgSession({
            pool: dbPool,
            createTableIfMissing: true,
        }),
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    }),
);

app.use(passport.session());

app.use('/', indexRouter);

// Error middleware
app.use((req, res) => res.render('404'));

const appPort = process.env.PORT || 8080;

app.listen(appPort, (error) => {
    if (error) {
        throw error;
    }
    console.log('App running and listening on port: ', appPort);
});
