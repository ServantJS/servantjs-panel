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
const prefix = '/nginx/groups';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);

    router.get('/', (req, res, next) => {
        async.waterfall([
            (cb) => {
                db.WorkerModel.find({}, 'sys_id server_name', {lean: true}, (err, list) => {
                    cb(err, list);
                });
            },
            (list, cb) => {
                db.WorkersGroupModel.find({}, 'sys_id name', {lean: true}, (err, _list) => {
                    if (err) {
                        cb(err);
                    } else {
                        list = list.concat(_list);
                        cb(null, {targets: list});
                    }
                });
            },
            (data, cb) => {
                moduleDB.NGINXConfigsGroupModel.find({}, 'name target_id source_dir', {lean: true}, (err, list) => {
                    if (err) {
                        cb(err);
                    } else {
                        data.groups = list;

                        async.each(data.groups, (item, next) => {
                            const target = data.targets.find((i) => i.sys_id === item.target_id);

                            if (target) {
                                item.is_group = target.sys_id[0] == 'G';
                                item.target_name = item.is_group ? target.name : target.server_name;
                            }

                            next();
                        }, (_err) => {
                            cb(err, data);
                        });
                    }
                });
            }
        
        ], (err, data) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList['nginx'][res.locals.lang]['groups'];
                content.data = data;
                res.render('groups', content);
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}`);
    router.post('/', (req, res, next) => {
        let name = req.body.name;
        let sourceDir = req.body.sourceDir;
        let targetId = req.body.targetId;

        if (!_.isStringParam(req.body, 'name')) {
            return next(new Error('Missing "name" property'));
        }

        if (!_.isStringParam(req.body, 'sourceDir')) {
            return next(new Error('Missing "sourceDir" property'));
        }

        if (!_.isStringParam(req.body, 'targetId')) {
            return next(new Error('Missing "targetId" property'));
        }

        var model = new moduleDB.NGINXConfigsGroupModel({
            name: name,
            source_dir: sourceDir,
            target_id: targetId
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
        model: moduleDB.NGINXConfigsGroupModel
    }));

    core.logger.verbose(`\t\tDELETE -> ${prefix}`);
    router.delete('/:id', (req, res, next) => {
        moduleDB.NGINXConfigModel.count({group_id: req.currentModel._id}, (err, c) => {
            if (err) {
                next(err);
            } else {
                if (c > 0) {
                    const msg = parent.wordsList['nginx'][res.locals.lang]['ajax'].delete.notOk;
                    res.json({ok: false, msg: req.currentModel.name + msg});
                } else {
                    req.currentModel.remove((err) => {
                        if (err) {
                            next(err);
                        } else {
                            const msg = parent.wordsList['nginx'][res.locals.lang]['ajax'].delete.ok;
                            res.json({ok: true, msg: req.currentModel.name + msg});
                        }
                    });         
                } 
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};