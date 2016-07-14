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
                moduleDB.MetricDataModel.find({node_id: req.currentModel._id}).select('sys_name component').lean().exec((err, metrics) => {
                    cb(err, metrics)
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

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};