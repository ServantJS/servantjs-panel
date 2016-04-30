'use strict';

const fs = require('fs');
const path = require('path');

module.exports = () => {
    const obj = {};

    fs.readdirSync(__dirname).forEach((name) => {
        if (name.endsWith('.js') && name != 'index.js') {
            obj[name.substring(0, name.indexOf('.'))] = require(path.join(__dirname, name));
        }
    });

    fs.readdirSync(path.join(__dirname, '..', 'modules')).forEach((name) => {
        obj[name] = require(path.join(__dirname, '..', 'modules', name, 'languages'));
    });

    console.log(obj);

    return obj;
};