'use strict';

const mongoose = require('mongoose');
const express  = require('express');
const cluster  = require('cluster');
const fs       = require('fs');
const path     = require('path');

const bodyParser     = require('body-parser');
const morgan         = require('morgan');
const methodOverride = require('method-override');
const cookieParser   = require('cookie-parser');
const session        = require('express-session');
const csrf           = require('csurf');


const logger = require('./lib/logger');
const conf   = require('./lib/config');

logger.verbose('Init. Options:', conf.get());

const db = require('./lib/db');

const MongoStore = require('connect-mongo')(session);

db.connect((err) => {
    if (err) {
        throw err;
    }

    logger.info('Successful connected to DB: ' + conf.get('db').url)
});

const app = express();

app.disable('x-powered-by');

const supportedLanguages = app.supportedLanguages = ['ru', 'us'];
const wordsList = app.wordsList = require('./languages')();

app.response.message = function (type, msg) {
    var sess = this.req.session;
    sess.messages = sess.messages || {};
    sess.messages[type] = msg;
    return this;
};

app.authorize = (req, res, next) => {
    var redirectAddress = req.path != '/signin' || req.path != '/signout' ? '/signin?r=' + req.originalUrl : req.originalUrl;
    if (req.session.userId) {
        db.UserModel.findById(req.session.userId, (err, user) => {
            if (err) {
                next(err);
            } else if (!user) {
                res.redirect(redirectAddress);
            } else {
                req.currentUser = user;
                res.locals.username = user.email;
                next();
            }
        });
    } else {
        res.redirect(redirectAddress);
    }
};

if (conf.get('env') == 'production') {
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'server.access.log'), {flags: 'a'});
    app.use(morgan('common', {stream: accessLogStream}));
} else {
    if (conf.get('fork')) {
        morgan.token('process-id', (req) => {
            return process.pid
        });

        app.use(morgan('[:process-id] :method :url :status :response-time ms - :res[content-length]'));
    } else {
        app.use(morgan('dev'));
    }
}

//set view engine -> jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//set static content (js, css, img)
app.use(express.static(path.join(__dirname, 'asserts')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
}

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(cookieParser());

const sessionOpt = {
    name: '__sid',
    secret: conf.get('secret_cookie'),
    store: new MongoStore({
        mongooseConnection: db.connection,
        collection: 'sessions'
    }),
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: true
};

app.use(session(sessionOpt));

app.use(function (req, res, next) {
    const al = req.get('Accept-Language');
    let setCookie = true;

    // if cookie is empty -> error raise didn't have hasOwnProperty function
    if (req.cookies.hasOwnProperty && req.cookies.hasOwnProperty('lang')) {
        if (supportedLanguages.indexOf(req.cookies.lang) != -1) {
            req.selectedLanguage = req.cookies.lang;
            req.words =
            setCookie = false;
        }
    }

    if (setCookie) {
        if (al) {
            req.selectedLanguage = al.indexOf('ru-RU') !== -1 ? 'ru' : 'us';
        } else {
            req.selectedLanguage = 'us';
        }

        res.cookie('lang', req.selectedLanguage, {expires: false, path: '/'});
    }

    next();
});

app.use(csrf());

app.use(function (req, res, next) {
    const msgs = req.session.messages || {};

    // layout words
    res.locals = wordsList['layout'][req.selectedLanguage];

    // page language
    res.locals.lang = req.selectedLanguage;

    // expose "messages" local variable
    res.locals.messages = msgs;

    // expose "hasMessages"
    res.locals.hasMessages = !!(msgs.error || msgs.warn || msgs.success);
    res.locals.csrfToken = req.csrfToken();

    // empty or "flush" the messages so they
    // don't build up
    req.session.messages = {};

    next();
});

// load main controllers
fs.readdirSync(path.join(__dirname, 'controllers')).forEach((name) => {
    logger.verbose(`Load core controller: ${name}`);
    require(path.join(__dirname, 'controllers', name))(app);
});

//load modules url handlers
fs.readdirSync(path.join(__dirname, 'modules')).forEach((name) => {
    logger.verbose(`Load module: ${name}`);
    require(path.join(__dirname, 'modules', name))(app);
});

// handle error
app.use((err, req, res, next) => {
    if (req.xhr) {
        if (err.hasOwnProperty('apiError')) {
            res.json({ok: false, error: err.apiError, msg: err.message});
        } else {
            res.json({ok: false, error: 'server_error', msg: 'Server error'});
        }
    } else {
        res.status(500).render('5xx');
    }

    logger.error(err.message);
    logger.verbose(err.stack);
});

//handle not found error
app.use((req, res, next) => {
    if (req.xhr) {
        res.json({status: 'err', error: 'not_found', msg: 'Not Found'});
    } else {
        res.status(404).render('404');
    }
});

(new db.UserModel({
    email: conf.get('root_account').email,
    pwd: conf.get('root_account').pwd,
    activated: true
})).save((e) => {});

exports.app = app;