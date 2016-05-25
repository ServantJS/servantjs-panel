'use strict';

const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const async = require('async');

const db = require('../lib/db');
const checkIdOnRequest = require('../modules/common').checkIdOnRequest;

const app = express();
const router = express.Router();

const core = require('../src/core');

const controller = 'server';
const prefix = '/servers';

module.exports = (parent) => {
    app.disable('x-powered-by');
    app.set('trust proxy', parent.get('trust proxy'));
    app.set('views', path.join(__dirname, '..', 'views', controller));

    core.logger.verbose('Init:');
    core.logger.verbose(`\t\tGET -> ${prefix}/info`);

    router.get('/info', (req, res, next) => {
        async.waterfall([
            (cb) => {
                db.ServerModel.find({}).lean().exec((err, servers) => {
                    cb(err, servers);
                });
            },
            (servers, cb) => {
                db.WorkerModel.find({}).lean().exec((err, workers) => {
                    if (err) {
                        cb(err);
                    } else {
                        let i = servers.length;
                        while (i--) {
                            servers[i].workers = workers.filter((x) => x.server_id.equals(servers[i]._id));
                        }

                        cb(null, servers);
                    }
                });
            }
        ], (err, data) => {
            if (err) {
                next(err);
            } else {
                var content = parent.wordsList[controller][res.locals.lang]['info'];
                content.data = data;
                res.render('info', content);
            }
        });
    });

    core.logger.verbose(`\t\tGET -> ${prefix}/groups`);
    router.get('/groups', (req, res, next) => {
        async.waterfall([
            (cb) => {
                db.WorkersGroupModel.find({})
                    .populate('workers', 'server_name')
                    .populate('server_id', 'server_name')
                    .lean().exec((err, groups) => {
                        cb(err, groups);
                    });
            },
            (groups, cb) => {
                db.ServerModel.find({}).lean().exec((err, servers) => {
                   cb(err, groups, servers);
                });
            },
            (groups, servers, cb) => {
                db.WorkerModel.find({}).lean().exec((err, workers) => {
                    cb(err, {groups: groups, servers: servers, workers: workers});
                });
            }
        ], (err, data) => {
            if (err) {
                next(err);
            } else {
                var content = parent.wordsList[controller][res.locals.lang]['groups'];
                content.data = data;
                res.render('groups', content);
            }
        });
    });

    core.logger.verbose(`\t\tPOST -> ${prefix}/groups`);
    router.post('/groups', (req, res, next) => {
        let name = req.body.name;
        let server = req.body.server;
        let agents = req.body.agents;

        try {
            if (!(name && name.length)) {
                const err = new Error('Missing name param');
                return next(err);
            }


            server = mongoose.Types.ObjectId(server);
            agents = agents.map((item) => mongoose.Types.ObjectId(item));

            var model = new db.WorkersGroupModel({
                name: name,
                server_id: server,
                workers: agents
            });

            model.save((err) => {
                if (err) {
                    next(err);
                } else {
                    res.json({ok: true});
                }
            });
        } catch (e) {
            next(e);
        }
    });

    router.param('id', checkIdOnRequest({
        model: db.WorkersGroupModel
    }));

    core.logger.verbose(`\t\tDELETE -> ${prefix}/groups/:id`);
    router.delete('/groups/:id', (req, res, next) => {
        req.currentModel.remove((err) => {
            if (err) {
                next(err);
            } else {
                res.json({ok: true});
            }
        });
    });

    app.use(prefix, parent.authorize, router);
    parent.use(app);
};