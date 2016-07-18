'use strict';

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const async = require('async');

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
                moduleDB.NodeDetailModel.find({}).sort('-hostname').select('hostname status').lean().exec((err, nodes) => {
                    cb(err, nodes);
                });
            }
        ], (err, nodes) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['monitoring'][res.locals.lang]['settings'];
                content.data = nodes;
                res.render('settings', content);
            }
        });
    });

    router.param('node_id', checkIdOnRequest({
        model: moduleDB.NodeDetailModel
    }));

    core.logger.verbose(`\t\tGET -> ${prefix}/:node_id`);
    router.get('/:node_id', (req, res, next) => {
        async.waterfall([
            (cb) => {
                moduleDB.MetricHistoryModel.find({node_id: req.currentModel._id}).select('sys_name component').sort('sys_name').lean().exec((err, metrics) => {
                    cb(err, metrics);
                });
            },
            (metrics, cb) => {
                moduleDB.MetricSettingModel.find({node_id: req.currentModel._id}).lean().exec((err, settings) => {
                    cb(err, {metrics: metrics, settings: settings});
                });
            }
        ], (err, data) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: data});
            }
        });
    });

    core.logger.verbose(`\t\tPUT -> ${prefix}/:node_id`);
    router.put('/:node_id', (req, res, next) => {
        let metric = req.body.metric;
        let component = req.body.component;

        if (!_.isStringParam(req.body, 'metric')) {
            return next(new Error('Missing "metric" property'));
        }

        if (!_.isStringParam(req.body, 'component')) {
            return next(new Error('Missing "component" property'));
        }

        moduleDB.MetricSettingModel.count(
            {node_id: req.currentModel._id, sys_name: metric, component: component, disabled: true}, (err, c) => {
                if (err) {
                    next(err);
                } else if (c) {
                    const content = parent.wordsList['monitoring'][res.locals.lang]['ajax'];
                    res.json({ok: false, msg: content.settings.exist});
                } else {
                    (new moduleDB.MetricSettingModel({
                        node_id: req.currentModel._id,
                        sys_name: metric,
                        component: component,
                        disabled: true
                    })).save((err) => {
                        if (err) {
                            next(err);
                        } else {

                            const task = new db.TaskModel({
                                username: req.currentUser.email,
                                server_id: req.currentModel.server_id,
                                target_id: 'SERVER',
                                module: 'monitoring',
                                cmd: 'update-settings',

                                params: JSON.stringify({id: req.currentModel._id})
                            });

                            task.save((err) => {
                                if (err) {
                                    next(err);
                                } else {
                                    const content = parent.wordsList['monitoring'][res.locals.lang]['ajax'];
                                    res.json({ok: true, msg: content.settings.ok});
                                }
                            });
                        }
                    });
                }
            });
    });

    core.logger.verbose(`\t\tDELETE -> ${prefix}/:node_id`);
    router.delete('/:node_id', (req, res, next) => {
        let metric = req.body.metric;
        let component = req.body.component;

        if (!_.isStringParam(req.body, 'metric')) {
            return next(new Error('Missing "metric" property'));
        }

        if (!_.isStringParam(req.body, 'component')) {
            return next(new Error('Missing "component" property'));
        }

        moduleDB.MetricSettingModel.remove(
            {node_id: req.currentModel._id, sys_name: metric, component: component, disabled: true},
            (err, entry) => {
                if (err) {
                    next(err);
                } else if (!entry.result.n) {
                    const content = parent.wordsList['monitoring'][res.locals.lang]['ajax'];
                    res.json({ok: false, msg: content.settings.notExist});
                } else {

                    const task = new db.TaskModel({
                        username: req.currentUser.email,
                        server_id: req.currentModel.server_id,
                        target_id: 'SERVER',
                        module: 'monitoring',
                        cmd: 'update-settings',

                        params: JSON.stringify({id: req.currentModel._id})
                    });

                    task.save((err) => {
                        if (err) {
                            next(err);
                        } else {
                            const content = parent.wordsList['monitoring'][res.locals.lang]['ajax'];
                            res.json({ok: true, msg: content.settings.removed});
                        }
                    });
                }

            });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};