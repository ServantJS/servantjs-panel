'use strict';

module.exports = (parent) => {
    require('./install')();

    require('./controllers/servers')(parent);
    require('./controllers/setting')(parent);
};