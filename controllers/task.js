'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');

const db = require('../lib/db');
const checkIdOnRequest = require('../modules/common').checkIdOnRequest;

const app = express();
const router = express.Router();

const core = require('../src/core');

const prefix = '/tasks';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views', 'task'));

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

    router.param('id', checkIdOnRequest({
        model: db.TaskModel
    }));

    core.logger.verbose(`\t\tGET -> ${prefix}/:id`);
    router.get('/:id', (req, res, next) => {
        if (req.xhr) {
            res.json({ok: true, data: req.currentModel});
        } else {
            var content = parent.wordsList['task'][res.locals.lang]['index'];
            content.data = req.currentModel;
            res.render('index', content);
        }
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/:id/status`);
    router.get('/:id/status', (req, res, next) => {
        res.json({ok: true, data: {status: req.currentModel.status}});
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};