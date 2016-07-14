'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MetricSettingSchema = exports.MetricSettingSchema = new Schema({
    node_id: {type: Schema.Types.ObjectId, index: true},

    sys_name: String,
    component: String
}, {collection: 'monitoring.metrics.settings'});

const MetricSchema = exports.MetricSchema = new Schema({
    node_id: {type: Schema.Types.ObjectId, index: true},

    sys_name: String,
    ts: {type: Date, index: {expires: '1d'}},
    measure: String,

    value: Number
}, {collection: 'monitoring.metrics.current'});

const MetricHistorySchema = exports.MetricHistorySchema = new Schema({
    node_id: {type: Schema.Types.ObjectId, index: true},

    sys_name: String,
    ts: {type: Date, index: {expires: '30d'}},
    measure: String,

    num_samples: Number,
    total_value: {
        v: Number,
        min: Number,
        max: Number
    },

    seq: Number,

    values: {type: Schema.Types.Mixed}
}, {collection: 'monitoring.metrics.history'});

mongoose.model('MetricData', MetricSchema);
mongoose.model('MetricSetting', MetricSettingSchema);
mongoose.model('MetricHistory', MetricHistorySchema);