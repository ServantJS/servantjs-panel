'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');
const async  = require('async');

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

                async.waterfall([
                    (cb) => {
                        db.TaskModel.find({}).sort('-dt').limit(10).exec((err, list) => {
                            cb(err, list);
                        });
                    },
                    (tasks, cb) => {
                        db.ServerModel.find({}).exec((err, list) => {
                            cb(err, {tasks: tasks, servers: list});
                        });
                    },
                    (data, cb) => {
                        db.WorkerModel.find({}).lean().exec((err, workers) => {
                            if (err) {
                                cb(err);
                            } else {
                                let i = data.servers.length;
                                while (i--) {
                                    data.servers[i].workers = workers.filter((x) => x.server_id.equals(data.servers[i]._id));
                                }

                                cb(null, data);
                            }
                        });
                    }
                ], (err, data) => {
                    if (err) {
                        next(err);
                    } else {
                        const content = parent.wordsList['dashboard'][res.locals.lang]['index'];
                        content.data = data;
                        res.render('dashboard', content);
                    }
                });
            }
        });
    });

    core.logger.verbose(`\t\tGET -> ${prefix}signin`);
    router.get('/signin', (req, res, next) => {
        const content = parent.wordsList['account'][res.locals.lang]['signin'];
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

        db.UserModel.authorize(email, password, function (err, result) {
            if (err) {
                next(err);
            } else if (!result) {
                res.json({ok: false, msg: parent.wordsList['account'][res.locals.lang]['signin'].controllerMsg.incorrect});
            } else {
                if (remember) {
                    req.session.cookie.expires = false;
                    req.session.cookie.maxAge = false;
                }

                req.session.userId = result._id;
                res.json({ok: true});
            }
        });
    });

    app.use(prefix, router);
    parent.use(app);
};