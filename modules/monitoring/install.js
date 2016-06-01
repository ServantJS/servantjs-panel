'use strict';

const mongoose = require('mongoose');
const async = require('async');

const lang = require('./languages');
const moduleDB = require('./db');
const logger = require('../../src/core').logger;

module.exports = () => {
    logger.verbose('Start install modules');
    async.waterfall([
        (cb) => {
            const id = new mongoose.Types.ObjectId();
            (new moduleDB.MetricModel({
                _id: id,
                sys_name: 'os_cpu',
                name: {
                    ru: lang.ru.db.systemModule.metric.cpu.name,
                    us: lang.us.db.systemModule.metric.cpu.name
                },
                description: {
                    ru: lang.ru.db.systemModule.metric.cpu.desc,
                    us: lang.us.db.systemModule.metric.cpu.desc
                },

                settings: []
            })).save((err) => {
               cb(err, [id]); 
            });
        },
        (metrics, cb) => {
            (new moduleDB.MonitoringModuleModel({
                sys_name: 'os',
                name: {
                    ru: lang.ru.db.systemModule.name,
                    us: lang.us.db.systemModule.name
                },
                description: {
                    ru: lang.ru.db.systemModule.desc,
                    us: lang.us.db.systemModule.desc
                },
                type: lang.ru.db.systemModule.type,
                metrics: metrics
            })).save((err) => {
                cb(err);
            });
        },
        (cb) => {
            (new moduleDB.MonitoringModuleModel({
                sys_name: 'haproxy',
                name: {
                    ru: lang.ru.db.HAProxyModule.name,
                    us: lang.us.db.HAProxyModule.name
                },
                description: {
                    ru: lang.ru.db.HAProxyModule.desc,
                    us: lang.us.db.HAProxyModule.desc
                },
                type: lang.ru.db.HAProxyModule.type
            })).save((err) => {
                cb(err);
            });
        }
    ], (err) => {
        logger.verbose('Complete install modules');
    });
};