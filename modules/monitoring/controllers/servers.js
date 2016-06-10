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

const prefix = '/monitoring/servers';

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
                db.WorkerModel.find({modules: 'monitoring'}).lean().exec((err, workers) => {
                    if (err) {
                        cb(err);
                    } else {
                        let i = servers.length;
                        while (i--) {
                            servers[i].workers = workers.filter((x) => x.server_id.equals(servers[i]._id));
                        }

                        cb(null, servers, workers);
                    }
                });
            }
        ], (err, data, workers) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['monitoring'][res.locals.lang]['servers'];
                content.data = {servers: data, workers: workers};
                res.render('servers', content);
            }
        });
    });

    router.param('server_id', (req, res, next, id) => {
        try {
            req.serverId = mongoose.Types.ObjectId(id);
            next();
        } catch (e) {
            next(e);
        }
    });

    router.param('worker_id', (req, res, next, id) => {
        try {
            req.workerId = mongoose.Types.ObjectId(id);
            next();
        } catch (e) {
            next(e);
        }
    });

    router.param('metric_id', (req, res, next, id) => {
        try {
            req.metricId = mongoose.Types.ObjectId(id);
            next();
        } catch (e) {
            next(e);
        }
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/:worker_id/cpu`);
    router.get('/:server_id/modules', (req, res, next) => {
        moduleDB.MonitoringModuleModel.find({}).populate({
            path: 'metrics',
            match: {'settings.server_id': req.serverId},
            select: `name.${res.locals.lang} description.${res.locals.lang} view_order sys_name settings.$`
        }).exec((err, modules) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: modules});
            }
        });
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/:worker_id/cpu`);
    router.get('/:worker_id/metrics/:metric_id/event', (req, res, next) => {
        moduleDB.MetricModel.findById(req.metricId, (err, metric) => {
            if (err) {
                next(err);
            }  else if (!metric) {
                next();
            }  else {
                let model = null;
                switch (metric.sys_name) {
                    case 'os_cpu':
                        model = moduleDB.CPUEventModel;
                        break;
                    case 'os_ram':
                        model = moduleDB.RAMEventModel;
                        break;
                    case 'os_net_a':
                        model = moduleDB.NetActivityEventModel;
                        break;
                    case 'node_details':
                        model = moduleDB.NodeDetailsModel;
                        break;
                    default:
                        return res.json({ok: false, error: 'not_implement'});
                }

                model.findOne({
                    metric_id: req.metricId,
                    worker_id: req.workerId
                }, 'values', (err, data) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json({ok: true, data: data ? data.values : null});
                    }
                });
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};