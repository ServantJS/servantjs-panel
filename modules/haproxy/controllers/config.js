'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');
const async = require('async');
const util = require('util');

const db = require('../../../lib/db');
const moduleDB = require('../db');

const app = express();
const router = express.Router();

const core = require('../../../src/core');

const controller = 'haproxy';
const prefix = '/haproxy/configs';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);

    router.get('/', (req, res, next) => {
        async.waterfall([
            (cb) => {
                db.WorkerModel.find({}, 'sys_id server_name', (err, list) => {
                    cb(err, list);
                });
            },
            (list, cb) => {
                db.WorkersGroupModel.find({}, 'sys_id name', (err, _list) => {
                    if (err) {
                        cb(err);
                    } else {
                        list = list.concat(_list);
                        cb(null, list);
                    }
                });
            },
            (list, cb) => {
                moduleDB.HAProxyConfigModel.find({'container.status': 0}).sort('target_id').lean().exec((err, configs) => {
                    if (err) {
                        cb(err);
                    } else {
                        let i = configs.length;
                        while (i--) {
                            configs[i].container = configs[i].container.map((item) => item.content).join('\n\n');
                        }

                        cb(null, {configs: configs, targets: list});
                    }
                });
            }
        ], (err, list) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList[controller][res.locals.lang]['configs'];
                content.data = list;
                res.render('configs', content);
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}`);
    router.post('/', (req, res, next) => {
        if (!req.body.targetId || !req.body.targetId.length) {
            return next(new Error('Missing "targetId" property'));
        }

        if (!Array.isArray(req.body.configs)) {
            return next(new Error('Configs must be an array'));
        }

        const task = new db.TaskModel({
            username: req.currentUser.email,
            target_id: req.body.targetId,
            module: controller,
            cmd: 'create-config',

            params: JSON.stringify({container: req.body.configs})
        });

        task.save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: task._id});
            }
        });
    });

    router.param('id', function (req, res, next, id) {
        try {
            req.configId = mongoose.Types.ObjectId(id);

            moduleDB.HAProxyConfigModel.findById(req.configId, (err, config) => {
                if (err) {
                    next(err);
                } else if (!config) {
                    err = new Error('Config not found');
                    err.apiError = 'not_found';
                    next(err);
                } else {
                    req.currentConfig = config;
                    next();
                }
            });
        } catch (e) {
            next(e);
        }
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/:target`);
    router.get('/:id', (req, res, next) => {
        const content = parent.wordsList[controller][res.locals.lang]['overview'];
        content.data = req.currentConfig;
        res.render('overview', content);
    });

    core.logger.verbose(`\t\tPUT -> ${prefix}/:id`);
    router.put('/:id', (req, res, next) => {
        try {
            let configs = req.body.configs;

            if (!Array.isArray(configs)) {
                return next(new Error('Configs must be an array'));
            }

            const data = {
                id: req.configId,
                container: configs
            };

            const task = new db.TaskModel({
                username: req.currentUser.email,
                target_id: req.currentConfig.target_id,
                module: controller,
                cmd: 'update-config',

                params: JSON.stringify(data)
            });

            task.save((err) => {
                if (err) {
                    next(err);
                } else {
                    res.json({ok: true, data: task._id});
                }
            });
        } catch (e) {
            next(e);
        }
    });

    core.logger.verbose(`\t\tDELETE -> ${prefix}/:id`);
    router.delete('/:id', (req, res, next) => {
        const task = new db.TaskModel({
            username: req.currentUser.email,
            target_id: req.currentConfig.target_id,
            module: controller,
            cmd: 'remove-config',

            params: JSON.stringify({id: req.configId})
        });

        task.save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: task._id});
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};