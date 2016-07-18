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

const prefix = '/monitoring/netmap';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);
    router.get('/', (req, res, next) => {
        moduleDB.NodeDetailModel.find({}, 'hostname node_type gw inets status', {lean: true}, (err, nodes) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['monitoring'][res.locals.lang]['netmap'];
                content.data = nodes;
                res.render('netmap', content);
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};