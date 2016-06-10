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
                view_order: 0,
                isDetail: false,
                settings: [],
                events: [{
                    sys_name: 'on_normal',
                    name: {
                        ru: lang.ru.db.systemModule.metric.cpu.event.on_normal,
                        us: lang.us.db.systemModule.metric.cpu.event.on_normal
                    }
                }, {
                    sys_name: 'on_warning',
                    name: {
                        ru: lang.ru.db.systemModule.metric.cpu.event.on_warning,
                        us: lang.us.db.systemModule.metric.cpu.event.on_warning
                    }
                }, {
                    sys_name: 'on_critical',
                    name: {
                        ru: lang.ru.db.systemModule.metric.cpu.event.on_critical,
                        us: lang.us.db.systemModule.metric.cpu.event.on_critical
                    }
                }]
            })).save((err) => {
                cb(null, [id]);
            });
        },
        (metrics, cb) => {
            const id = new mongoose.Types.ObjectId();
            metrics.push(id);
            (new moduleDB.MetricModel({
                _id: id,
                sys_name: 'os_ram',
                name: {
                    ru: lang.ru.db.systemModule.metric.ram.name,
                    us: lang.us.db.systemModule.metric.ram.name
                },
                description: {
                    ru: lang.ru.db.systemModule.metric.ram.desc,
                    us: lang.us.db.systemModule.metric.ram.desc
                },
                view_order: 1,
                isDetail: false,
                settings: [],
                events: [{
                    sys_name: 'on_normal',
                    name: {
                        ru: lang.ru.db.systemModule.metric.ram.event.on_normal,
                        us: lang.us.db.systemModule.metric.ram.event.on_normal
                    }
                }, {
                    sys_name: 'on_warning',
                    name: {
                        ru: lang.ru.db.systemModule.metric.ram.event.on_warning,
                        us: lang.us.db.systemModule.metric.ram.event.on_warning
                    }
                }, {
                    sys_name: 'on_critical',
                    name: {
                        ru: lang.ru.db.systemModule.metric.ram.event.on_critical,
                        us: lang.us.db.systemModule.metric.ram.event.on_critical
                    }
                }]
            })).save((err) => {
                cb(null, metrics);
            });
        },
        (metrics, cb) => {
            const id = new mongoose.Types.ObjectId();
            metrics.push(id);
            (new moduleDB.MetricModel({
                _id: id,
                sys_name: 'os_net_a',
                name: {
                    ru: lang.ru.db.systemModule.metric.netA.name,
                    us: lang.us.db.systemModule.metric.netA.name
                },
                description: {
                    ru: lang.ru.db.systemModule.metric.netA.desc,
                    us: lang.us.db.systemModule.metric.netA.desc
                },
                view_order: 2,
                isDetail: false,
                settings: [],
                events: [{
                    sys_name: 'on_normal',
                    name: {
                        ru: lang.ru.db.systemModule.metric.netA.event.on_normal,
                        us: lang.us.db.systemModule.metric.netA.event.on_normal
                    }
                }, {
                    sys_name: 'on_warning',
                    name: {
                        ru: lang.ru.db.systemModule.metric.netA.event.on_warning,
                        us: lang.us.db.systemModule.metric.netA.event.on_warning
                    }
                }, {
                    sys_name: 'on_critical',
                    name: {
                        ru: lang.ru.db.systemModule.metric.netA.event.on_critical,
                        us: lang.us.db.systemModule.metric.netA.event.on_critical
                    }
                }]
            })).save((err) => {
                cb(null, metrics);
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
                cb(null);
            });
        },
        (cb) => {
            const id = new mongoose.Types.ObjectId();
            (new moduleDB.MetricModel({
                _id: id,
                sys_name: 'node_details',
                name: {
                    ru: lang.ru.db.nodeDetailsModule.metric.details.name,
                    us: lang.us.db.nodeDetailsModule.metric.details.name
                },
                description: {
                    ru: lang.ru.db.nodeDetailsModule.metric.details.desc,
                    us: lang.us.db.nodeDetailsModule.metric.details.desc
                },
                isDetail: true,
                settings: []
            })).save((err) => {
                cb(null, [id]);
            });
        },
        (metrics, cb) => {
            (new moduleDB.MonitoringModuleModel({
                sys_name: 'node',
                name: {
                    ru: lang.ru.db.nodeDetailsModule.name,
                    us: lang.us.db.nodeDetailsModule.name
                },
                description: {
                    ru: lang.ru.db.nodeDetailsModule.desc,
                    us: lang.us.db.nodeDetailsModule.desc
                },
                type: lang.ru.db.nodeDetailsModule.type,
                metrics: metrics
            })).save((err) => {
                cb(null);
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
                cb(null);
            });
        }
    ], (err) => {
        logger.verbose('Complete install modules');
    });
};