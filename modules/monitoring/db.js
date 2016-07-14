'use strict';

const mongoose = require('mongoose');

require('./models').load();

exports.NodeDetailModel = mongoose.model('NodeDetail');
exports.MetricSettingModel = mongoose.model('MetricSetting');
exports.MetricDataModel = mongoose.model('MetricData');
exports.MetricHistoryModel = mongoose.model('MetricHistory');