'use strict';

module.exports = (parent) => {
    require('./controllers/config')(parent);
    require('./controllers/setting')(parent);
};