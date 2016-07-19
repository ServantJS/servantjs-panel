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

const prefix = '/monitoring/nodes';

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
                const content = parent.wordsList['monitoring'][res.locals.lang]['nodes'];
                content.data = nodes;
                res.render('nodes', content);
            }
        });
    });

    router.get('/status', (req, res, next) => {
        moduleDB.NodeDetailModel.find({}).sort('-hostname').select('hostname status').lean().exec((err, nodes) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: nodes});
            }
        });
    });

    router.param('node_id', checkIdOnRequest({
        model: moduleDB.NodeDetailModel
    }));

    core.logger.verbose(`\t\tGET -> ${prefix}/:node_id/details`);
    router.get('/:node_id/details', (req, res, next) => {
        res.json({ok: true, data: req.currentModel});
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/:node_id/metrics`);
    router.get('/:node_id/metrics', (req, res, next) => {
        moduleDB.MetricDataModel.find({node_id: req.currentModel._id}).sort('sys_name component').lean().exec((err, metrics) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: req.currentModel.status ? metrics : []});
            }
        });
    });
    
    app.use(prefix, parent.authorize, router);
    parent.use(app);
};