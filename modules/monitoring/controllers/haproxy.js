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

const prefix = '/monitoring/haproxy';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}/stats`);
    router.get('/stats', (req, res, next) => {
        db.WorkerModel.find({modules: 'monitoring'}).lean().exec((err, workers) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['monitoring'][res.locals.lang]['haStats'];
                content.data = {workers: workers};
                res.render('haproxy-stats', content);
            }
        });
    });

    router.param('worker_id', (req, res, next, id) => {
        try {
            req.workerId = mongoose.Types.ObjectId(id);
            next();
        } catch (e) {
            next(e);
        }
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/stats/:worker_id`);
    router.get('/stats/:worker_id', (req, res, next) => {
        moduleDB.HaProxyStatEventEventModel.findOne({worker_id: req.workerId}).lean().exec((err, stats) => {
            if (err) {
                next(err);
            } else if (!stats) {
                next();
            } else {
                res.json({ok: true, data: stats});
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};