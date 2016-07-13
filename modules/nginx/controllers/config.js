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
const prefix = '/nginx/configs';

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
                        cb(null, list);
                    }
                });
            },
            (targets, cb) => {
                moduleDB.NGINXConfigsGroupModel.find({}, 'name', (err, list) => {
                    cb(err, {targets: targets, groups: list});
                });
            },
            (data, cb) => {
                moduleDB.NGINXTemplateModel.find({}, 'name vars', (err, list) => {
                    data.templates = list;
                    cb(err, data);
                });
            },
            (data, cb) => {
                moduleDB.NGINXConfigModel.find({}).populate('group_id', 'name target_id').select('group_id name status kind').lean().exec((err, list) => {
                    if (err) {
                        cb(err);
                    } else {
                        data.configs = list;

                        async.each(data.configs, (item, next) => {
                            const target = data.targets.find((i) => i.sys_id === item.group_id.target_id);

                            if (target) {
                                item.group_id.is_group = target.sys_id[0] == 'G';
                                item.group_id.server_name = item.group_id.is_group ? target.name : target.server_name;
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
                const content = parent.wordsList['nginx'][res.locals.lang]['configs'];
                content.data = data;
                res.render('configs', content);
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}`);
    router.post('/', (req, res, next) => {
        let name = req.body.name;
        let content = req.body.content;
        let kind = req.body.kind;
        let groupId = req.body.group;
        let templateId = req.body.template;
        let vars = req.body.vars;

        if (!_.isStringParam(req.body, 'name')) {
            return next(new Error('Missing "name" property'));
        }

        if (!(_.isStringParam(req.body, 'content') || _.isStringParam(req.body, 'template'))) {
            return next(new Error('Missing "content" or "template" property'));
        }

        if (!_.isStringParam(req.body, 'group')) {
            return next(new Error('Missing "group" property'));
        }

        if (!_.isNumberParam(req.body, 'kind')) {
            return next(new Error('Missing "kind" property'));
        }

        if (!_.isArrayParam(req.body, 'vars')) {
            return next(new Error('Missing "vars" property'));
        }

        async.waterfall([
            (cb) => {
                moduleDB.NGINXConfigsGroupModel.findOne({_id: mongoose.Types.ObjectId(groupId)}, (err, group) => {
                    if (err) {
                        cb(err);
                    } else if (!group) {
                        err = new Error('Group not found');
                        err.apiError = 'not_found';
                        cb(err);
                    } else {
                        cb(null, group.target_id);
                    }
                });
            },
            (targetId, cb) => {
                const p = {
                    name: name,
                    content: content,
                    vars: vars,
                    groupId: groupId,
                    kind: kind
                };

                if (!content || !content.length) {
                    moduleDB.NGINXTemplateModel.findOne({_id: mongoose.Types.ObjectId(templateId)}, (err, template) => {
                        if (err) {
                            cb(err);
                        } else if (!template) {
                            err = new Error('Template not found');
                            err.apiError = 'not_found';
                            cb(err);
                        } else {
                            p.content = template.content;
                            cb(null, p, targetId);
                        }
                    });
                } else {
                    cb(null, p, targetId);
                }
            },
            (p, targetId, cb) => {
                const task = new db.TaskModel({
                    username: req.currentUser.email,
                    target_id: targetId,
                    module: controller,
                    cmd: 'create-config',

                    params: JSON.stringify(p)
                });

                task.save((err) => {
                    cb(err, task);
                });
            }
        ], (err, task) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: task._id});
            }
        });
    });

    router.param('id', checkIdOnRequest({
        model: moduleDB.NGINXConfigModel
    }));

    core.logger.verbose(`\t\tPUT -> ${prefix}/:id`);
    router.get('/:id', (req, res, next) => {
        res.json({ok: true, data: req.currentModel});
    });

    core.logger.verbose(`\t\tPUT -> ${prefix}/:id`);
    router.put('/:id', (req, res, next) => {
        let name = req.body.name;
        let content = req.body.content;

        if (!_.isStringParam(req.body, 'name')) {
            return next(new Error('Missing "name" property'));
        }

        if (!_.isStringParam(req.body, 'content')) {
            return next(new Error('Missing "content" property'));
        }

        moduleDB.NGINXConfigModel.populate(req.currentModel, [{path: 'group_id', select: 'target_id'}], (err, config) => {
            if (err) {
                next(err);
            } else {
                const task = new db.TaskModel({
                    username: req.currentUser.email,
                    target_id: config.group_id.target_id,
                    module: controller,
                    cmd: 'update-config',

                    params: JSON.stringify({id: req.currentModel._id, name: name, content: content})
                });

                task.save((err) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json({ok: true, data: task._id});
                    }
                });
            }
        });
    });

    core.logger.verbose(`\t\tDELETE -> ${prefix}/:id`);
    router.delete('/:id', (req, res, next) => {
        moduleDB.NGINXConfigModel.populate(req.currentModel, [{path: 'group_id', select: 'target_id'}], (err, config) => {
            if (err) {
                next(err);
            } else {
                const task = new db.TaskModel({
                    username: req.currentUser.email,
                    target_id: config.group_id.target_id,
                    module: controller,
                    cmd: 'remove-config',

                    params: JSON.stringify({id: req.currentModel._id})
                });

                task.save((err) => {
                    if (err) {
                        next(err);
                    } else {
                        res.json({ok: true, data: task._id});
                    }
                });
            }
        });
    });
    
    app.use(prefix, parent.authorize, router);
    parent.use(app);
};