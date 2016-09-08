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

    router.post('/', (req, res, next) => {
        let email = req.body.email;
        let pwd = req.body.pwd;

        if (!(email && email.length)) {
            return next(new Error('Missing "email" property'));
        }

        if (!(pwd && pwd.length)) {
            return next(new Error('Missing "pwd" property'));
        }

        (new db.UserModel({
            email: email,
            pwd: pwd,
            activated: true
        })).save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true});
            }
        });
    });

    router.param('user_id', (req, res, next, id) => {
        try {
            db.UserModel.findById(mongoose.Types.ObjectId(id), (err, model) => {
                if (err) {
                    next(err);
                } else if (!model) {
                    err = new Error('Not found');
                    err.apiError = 'not_found';
                    next(err);
                } else {
                    req.currentModel = model;
                    next();
                }
            });
        } catch (e) {
            next(e);
        }
    });

    router.put('/:user_id', (req, res, next) => {
        let pwd = req.body.pwd;

        if (!(pwd && pwd.length)) {
            return next(new Error('Missing "pwd" property'));
        }
        
        req.currentModel.pwd = pwd;
        req.currentModel.save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, msg: parent.wordsList['user'][res.locals.lang]['ajax'].edit.ok});
            }
        });
    });

    router.delete('/:user_id', (req, res, next) => {
        var msgs = parent.wordsList['user'][res.locals.lang]['ajax'];

        if (req.currentModel._id.equals(mongoose.Types.ObjectId('000000000000000000000001'))) {
            res.json({ok: false, msg: msgs.delete.root});
            return;
        }

        req.currentModel.remove((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, msg: msgs.delete.ok});
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};