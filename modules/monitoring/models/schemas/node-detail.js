'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SystemSchema = new Schema({
    name: String,
    version: String,
    type: String,
    arch: String,
    kernel: String,
    hypervisor: String,
    virtualization: String
}, {_id :false});

const IPSchema = new Schema({
    address:String,
    mask: String,
    family: String
}, {_id :false});

const INetSchema = new Schema({
    name: String,
    mac: String,
    is_default: Boolean,
    ip: [IPSchema]
}, {_id :false});

const NodeDetailSchema = exports.NodeDetailSchema = new Schema({
    node_id: {type: Schema.Types.ObjectId, index: true},
    ts: Date,
    
    node_type: String,
    vendor: String,

    uptime: Number,
    status: Number,
    hostname: String,

    system: SystemSchema,
    gw: String,
    inets: [INetSchema]
}, {collection: 'monitoring.node.details'});

mongoose.model('NodeDetail', NodeDetailSchema);