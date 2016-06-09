'use strict';

const mongoose = require('mongoose');

require('./models').load();

exports.MonitoringModuleModel = mongoose.model('MonitoringModule');
exports.MetricModel = mongoose.model('Metric');
exports.CPUHistoryModel = mongoose.model('CPUHistory');
exports.CPUEventModel = mongoose.model('CPUEvent');
exports.RAMHistoryModel = mongoose.model('RAMHistory');
exports.RAMEventModel = mongoose.model('RAMEvent');
exports.NodeDetailsModel = mongoose.model('NodeDetails');