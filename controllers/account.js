'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');

const db = require('../lib/db');

const app = express();
const router = express.Router();

const core = require('../src/core');

const prefix = '/';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views', 'account'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);
    router.get('/', (req, res, next) => {
        parent.authorize(req, res, (err) => {
            if (err) {
                next(err);
            } else {
                //var content = words[req.selectedLanguage]['dashboard'];
                res.render('dashboard');
            }
        });
    });

    core.logger.verbose(`\t\tGET -> ${prefix}signin`);
    router.get('/signin', (req, res, next) => {
        var content = parent.wordsList['account'][res.locals.lang]['signin'];
        content.redirect = req.query.r || '/';
        res.render('signin', content);
    });

    core.logger.verbose(`\t\tGET -> ${prefix}signout`);
    router.get('/signout', (req, res, next) => {
        parent.authorize(req, res, (err) => {
            if (err) {
                next(err);
            } else {
                req.session.destroy();
                res.redirect('/signin');
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}signin`);
    router.post('/signin', (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;
        var remember = req.body.remember;
        var redirect = req.body.redirect;

        db.UserModel.authorize(email, password, function (err, result) {
            if (err) {
                next(err);
            } else if (!result) {
                res.message('error', parent.wordsList['account'][res.locals.lang]['signin'].controllerMsg.incorrect);
                res.redirect('/signin?r=' + (redirect || '/'));
            } else {
                if (remember) {
                    req.session.cookie.expires = false;
                    req.session.cookie.maxAge = false;
                }

                req.session.userId = result._id;
                res.redirect(redirect);
            }
        });
    });



    app.use(prefix, router);
    parent.use(app);
};