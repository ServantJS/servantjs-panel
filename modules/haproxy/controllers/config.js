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

const controller = 'haproxy';
const prefix = '/haproxy/configs';

const upload = multer({
    dest: os.tmpdir(),
    limits: {
        fileSize: 1024 * 1024 * 20
    }
}).fields([{name: 'config', maxCount: 1}]);

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views'));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}`);

    router.get('/', (req, res, next) => {
        async.waterfall([
            (cb) => {
                db.WorkerModel.find({}, 'sys_id server_name', (err, list) => {
                    cb(err, list);
                });
            },
            (list, cb) => {
                db.WorkersGroupModel.find({}, 'sys_id name', (err, _list) => {
                    if (err) {
                        cb(err);
                    } else {
                        list = list.concat(_list);
                        cb(null, list);
                    }
                });
            },
            (list, cb) => {
                moduleDB.HAProxyConfigModel.find({'container.status': 0}).sort('target_id').lean().exec((err, configs) => {
                    if (err) {
                        cb(err);
                    } else {
                        let i = configs.length;
                        while (i--) {
                            configs[i].container = configs[i].container.map((item) => (item.kind !== 0 && item.kind !== 1 ? '#' + item.meta.map((item) => `${item.token_name}: ${item.value}`).join(', ') + '\n' : '') + item.content).join('\n\n');
                        }

                        cb(null, {configs: configs, targets: list});
                    }
                });
            },
            (data, cb) => {
                moduleDB.HAProxySettingModel.find({}).exec((err, meta) => {
                    if (err) {
                        cb(err);
                    } else {
                        data.meta = meta;
                        cb(null, data);
                    }
                });
            }
        ], (err, list) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList[controller][res.locals.lang]['configs'];
                content.data = list;
                res.render('configs', content);
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}`);
    router.post('/', (req, res, next) => {
        if (!_.isStringParam(req.body, 'targetId')) {
            return next(new Error('Missing "targetId" property'));
        }
        
        if (!_.isNotEmptyArrayParam(req.body, 'configs')) {
            return next(new Error('Configs must be an array'));
        }

        const task = new db.TaskModel({
            username: req.currentUser.email,
            target_id: req.body.targetId,
            module: controller,
            cmd: 'create-config',

            params: JSON.stringify({container: req.body.configs})
        });

        task.save((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true, data: task._id});
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}`);
    router.post('/import', (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                next(err);
            } else {
                req.body = Object.assign({}, req.body);
                if (!_.isStringParam(req.body, 'targetId')) {
                    return next(new Error('Missing "targetId" property'));
                }
                
                if (req.files && req.files.config && req.files.config.length) {
                    const file = req.files.config[0];
                    
                    fs.readFile(file.path, 'utf8', (err, content) => {
                        if (err) {
                            next(err);
                        } else {
                            const arr = content.split('\n');
                            const blocks = [];

                            const re = /^\S+\s+(\S+)/;
                            let index = 0;
                            let defCount = 0;
                            let currentBlock = null;
                            
                            async.whilst(
                                () => index < arr.length,
                                (next) => {
                                    try {
                                        let kind = -1;
                                        let name = '';

                                        if (arr[index].startsWith('global')) {
                                            kind = 0;
                                            name = 'global';
                                        } else if (arr[index].startsWith('defaults')) {
                                            kind = 1;
                                            name = 'defaults' + (defCount > 0 ? defCount : '');
                                            defCount++;
                                        } else if (arr[index].startsWith('listen')) {
                                            kind = 2;
                                        } else if (arr[index].startsWith('frontend')) {
                                            kind = 3;
                                        } else if (arr[index].startsWith('backend')) {
                                            kind = 4;
                                        } else if (arr[index].startsWith('#')) {
                                            index++;
                                            return next();
                                        }

                                        if (kind >= 2) {
                                            let m;
                                            if ((m = re.exec(arr[index])) !== null) {
                                                name = m[1];
                                            }
                                        }

                                        if (kind != -1) {
                                            if (currentBlock == null) {
                                                currentBlock = {content: []};
                                            } else {
                                                currentBlock.content = currentBlock.content.join('\n');
                                                blocks.push(currentBlock);
                                                currentBlock = {content: []};
                                            }

                                            currentBlock.content.push(arr[index]);
                                            currentBlock.name = name;
                                            currentBlock.kind = kind;
                                            currentBlock.status = 0;
                                        } else {

                                            if (currentBlock)
                                                currentBlock.content.push(arr[index]);
                                        }

                                        index++;
                                        next();
                                    } catch (e) {
                                        next(e);
                                    }
                                },
                                (err) => {
                                    if (err) {
                                        next(err);
                                    } else {
                                        currentBlock.content = currentBlock.content.join('\n');
                                        blocks.push(currentBlock);
                                        
                                        fs.unlink(file.path, (err) => {
                                            if (err) {
                                                next(err);
                                            } else {
                                                const task = new db.TaskModel({
                                                    username: req.currentUser.email,
                                                    target_id: req.body.targetId,
                                                    module: controller,
                                                    cmd: 'create-config',

                                                    params: JSON.stringify({container: blocks})
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
                                    }
                                }
                            );
                        }
                    });
                } else {
                    next(new Error('Missing config file'));
                }
            }
        });
    });

    router.param('id', checkIdOnRequest({
        model: moduleDB.HAProxyConfigModel
    }));

    core.logger.verbose(`\t\tGET -> ${prefix}/:target`);
    router.get('/:id', (req, res, next) => {
        moduleDB.HAProxySettingModel.find({}).exec((err, meta) => {
            if (err) {
                next(err);
            } else {
                const content = parent.wordsList[controller][res.locals.lang]['overview'];
                content.data = req.currentModel;
                content.data.meta = meta;
                res.render('overview', content);
            }
        });
    });

    core.logger.verbose(`\t\tPUT -> ${prefix}/:id`);
    router.put('/:id', (req, res, next) => {
        try {
            let configs = req.body.configs;

            if (!_.isNotEmptyArrayParam(req.body, 'configs')) {
                return next(new Error('Configs must be an array'));
            }

            const data = {
                id: req.currentModel._id,
                container: configs
            };

            const task = new db.TaskModel({
                username: req.currentUser.email,
                target_id: req.currentModel.target_id,
                module: controller,
                cmd: 'update-config',

                params: JSON.stringify(data)
            });

            task.save((err) => {
                if (err) {
                    next(err);
                } else {
                    res.json({ok: true, data: task._id});
                }
            });
        } catch (e) {
            next(e);
        }
    });

    core.logger.verbose(`\t\tDELETE -> ${prefix}/:id`);
    router.delete('/:id', (req, res, next) => {
        const task = new db.TaskModel({
            username: req.currentUser.email,
            target_id: req.currentModel.target_id,
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
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};