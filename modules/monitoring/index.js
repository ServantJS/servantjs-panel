'use strict';

module.exports = (parent) => {
    require('./install')();

    require('./controllers/servers')(parent);
    require('./controllers/haproxy')(parent);
    require('./controllers/setting')(parent);
};