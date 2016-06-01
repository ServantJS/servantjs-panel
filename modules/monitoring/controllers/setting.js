'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');
const async  = require('async');

const db = require('../../../lib/db');

const _ = require('../../common');
const checkIdOnRequest = require('../../common').checkIdOnRequest;
const moduleDB = require('../db');

const app = express();
const router = express.Router();

const core = require('../../../src/core');

const prefix = '/monitoring/settings';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);
    router.get('/', (req, res, next) => {
        async.waterfall([
            (cb) => {
                db.ServerModel.find({}).lean().exec((err, servers) => {
                    cb(err, servers);
                });
            },
            (servers, cb) => {
                moduleDB.MonitoringModuleModel.find({})
                    .populate('metrics', `name.${res.locals.lang} description.${res.locals.lang} sys_name`)
                    .select(`name.${res.locals.lang} description.${res.locals.lang} sys_name metrics`)
                    .exec((err, modules) => {
                        if (err) {
                            cb(err);
                        } else {
                            cb(null, {servers: servers, modules: modules});
                        }
                    });
            }
        ], (err, data) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['monitoring'][res.locals.lang]['settings'];
                content.data = data;
                res.render('settings', content);
            }
        });
    });

    router.param('id', (req, res, next, id) => {
        try {
            req.id = mongoose.Types.ObjectId(id);
            next();
        } catch (e) {
            next(e);
        }
    });

    router.param('server_id', (req, res, next, id) => {
        try {
            req.serverId = mongoose.Types.ObjectId(id);
            next();
        } catch (e) {
            next(e);
        }
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/:id/servers/:server_id`);
    router.get('/:id/servers/:server_id', (req, res, next) => {
        moduleDB.MetricModel.findOne({_id: req.id, 'settings.server_id': req.serverId}, 'settings.$', (err, settings) => {
            if (err) {
                next(err);
            } else if (!settings) {
                res.json({ok: true, data: null});
            } else {
                res.json({ok: true, data: settings.settings[0]});
            }
        });
    });

    core.logger.verbose(`\t\tPUT -> ${prefix}/:id/servers/:server_id`);
    router.put('/:id/servers/:server_id', (req, res, next) => {
        req.body.server_id = req.serverId;

        async.waterfall([
            (cb) => {
                moduleDB.MetricModel.update({_id: req.id, 'settings.server_id': req.serverId}, {$set: {'settings.$': req.body}}, (err, status) => {
                    cb(err, status);
                });
            },
            (status, cb) => {
                if (status.n == 0) {
                    moduleDB.MetricModel.update({_id: req.id}, {$push: {'settings': req.body}}, (err, status) => {
                        cb(err, status);
                    });
                } else {
                    cb(null, status);
                }
            },
            (status, cb) => {
                if (status.nModified) {
                    const task = new db.TaskModel({
                        username: req.currentUser.email,
                        server_id: req.serverId,
                        target_id: 'SERVER',
                        module: 'monitoring',
                        cmd: 'update-settings',

                        params: JSON.stringify({id: req.id})
                    });

                    task.save((err) => {
                        const msg = parent.wordsList['monitoring'][res.locals.lang]['settings'].save.success;
                        cb(err, msg, false);
                    });
                } else {
                    const msg = parent.wordsList['monitoring'][res.locals.lang]['settings'].save.notModify;
                    cb(null, msg, true);
                }
            }
        ], (err, msg, warning) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, warning: warning, msg: msg});
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};