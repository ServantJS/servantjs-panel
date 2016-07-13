'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const path  = require('path');
const async = require('async');
const util = require('util');
const multer = require('multer');
const os = require('os');
const fs = require('fs');

const db = require('../../../lib/db');

const _ = require('../../common');
const checkIdOnRequest = require('../../common').checkIdOnRequest;
const moduleDB = require('../db');

const app = express();
const router = express.Router();

const core = require('../../../src/core');

const controller = 'nginx';
const prefix = '/nginx/templates';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);

    router.get('/', (req, res, next) => {
        async.waterfall([
            (cb) => {
                moduleDB.NGINXTemplateModel.find({}, (err, list) => {
                    cb(err, {templates: list});
                });
            }
        ], (err, data) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['nginx'][res.locals.lang]['templates'];
                content.data = data;
                res.render('templates', content);
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}`);
    router.post('/', (req, res, next) => {
        let name = req.body.name;
        let content = req.body.content;
        let vars = req.body.vars;

        if (!_.isStringParam(req.body, 'name')) {
            return next(new Error('Missing "name" property'));
        }

        if (!_.isStringParam(req.body, 'content')) {
            return next(new Error('Missing "content" property'));
        }

        if (!_.isArrayParam(req.body, 'vars')) {
            return next(new Error('Missing "vars" property'));
        }

        var model = new moduleDB.NGINXTemplateModel({
            name: name,
            content: content,
            vars: vars
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
        model: moduleDB.NGINXTemplateModel
    }));

    core.logger.verbose(`\t\tPUT -> ${prefix}/:id`);
    router.put('/:id', (req, res, next) => {
        let content = req.body.content;
        let vars = req.body.vars;
        
        if (!_.isStringParam(req.body, 'content')) {
            return next(new Error('Missing "content" property'));
        }

        if (!_.isArrayParam(req.body, 'vars')) {
            return next(new Error('Missing "vars" property'));
        }

        req.currentModel.content = content;
        req.currentModel.vars = vars;

        req.currentModel.save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true});
            }
        });
    });
    
    core.logger.verbose(`\t\tDELETE -> ${prefix}/:id`);
    router.delete('/:id', (req, res, next) => {
        req.currentModel.remove((err) => {
            if (err) {
                next(err);
            } else {
                const msg = parent.wordsList['nginx'][res.locals.lang]['ajax'].delete.ok;
                res.json({ok: true, msg: req.currentModel.name + msg});
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};