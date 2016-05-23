'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');

const db = require('../lib/db');

const app = express();
const router = express.Router();

const core = require('../src/core');

const prefix = '/users';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views', 'user'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);

    router.get('/', (req, res, next) => {
        db.UserModel.find().exec((err, users) => {
            if (err) {
                next(err);
            } else {
                var content = parent.wordsList['user'][res.locals.lang]['index'];
                content.data = users;
                res.render('index', content);
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};