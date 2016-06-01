'use strict';

module.exports = (parent) => {
    require('./install')();
    
    require('./controllers/setting')(parent);
};