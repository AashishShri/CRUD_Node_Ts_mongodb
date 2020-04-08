"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const crmRoutes_1 = require("./routes/crmRoutes");
const mongoose = require("mongoose");
var winston = require('../winston/winston');
var morgan = require('morgan');
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        // public mongoUrl: string = 'mongodb://localhost/CRMdb';
        this.mongoUrl = 'mongodb://Aashish:123456@localhost:27017/CRMdb';
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        this.mongoSetup();
    }
    config() {
        this.app.use(morgan('combined', { stream: winston.stream }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(function (err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            // add this line to include winston logging
            winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map