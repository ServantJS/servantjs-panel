'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');

const db = require('../../../lib/db');

const _ = require('../../common');
const checkIdOnRequest = require('../../common').checkIdOnRequest;
const moduleDB = require('../db');

const app = express();
const router = express.Router();

const core = require('../../../src/core');

const prefix = '/haproxy/settings';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);
    router.get('/', (req, res, next) => {
        moduleDB.HAProxySettingModel.find().exec((err, list) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['haproxy'][res.locals.lang]['settings'];
                content.data = list;
                res.render('settings', content);
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}`);
    router.post('/', (req, res, next) => {
        let name = req.body.name;
        let desc = req.body.desc;

        if (!_.isStringParam(req.body, 'name')) {
            return next(new Error('Missing "name" property'));
        }

        if (!_.isStringParam(req.body, 'desc')) {
            return next(new Error('Missing "desc" property'));
        }

        var model = new moduleDB.HAProxySettingModel({
            token_name: name,
            description: desc
        });

        model.save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true});
            }
        });
    });

    router.param('id', checkIdOnRequest({
        model: moduleDB.HAProxySettingModel
    }));

    core.logger.verbose(`\t\tPUT -> ${prefix}`);
    router.put('/:id', (req, res, next) => {
        let name = req.body.name;
        let desc = req.body.desc;

        if (!_.isStringParam(req.body, 'name')) {
            return next(new Error('Missing "name" property'));
        }

        if (!_.isStringParam(req.body, 'desc')) {
            return next(new Error('Missing "desc" property'));
        }

        req.currentModel.token_name = name;
        req.currentModel.description = desc;

        req.currentModel.save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true});
            }
        });
    });

    core.logger.verbose(`\t\tDELETE -> ${prefix}`);
    router.delete('/:id', (req, res, next) => {
        req.currentModel.remove((err) => {
            if (err) {
                next(err);
            } else {
                const msg = parent.wordsList['haproxy'][res.locals.lang]['ajax'].delete.ok;
                res.json({ok: true, msg: req.currentModel.token_name + msg});
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};