'use strict';

module.exports = (parent) => {
    require('./controllers/config')(parent);
    require('./controllers/group')(parent);
    require('./controllers/template')(parent);

    return {ru: require('./languages').ru.menu, us: require('./languages').us.menu};
};