"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as express from "express";
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const crmRoutes_1 = require("./routes/crmRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const imageUploadRoutes_1 = require("./routes/imageUploadRoutes");
// import * as swaggerUi from 'swagger-ui-express';
const mongoose_1 = __importDefault(require("mongoose"));
const typescript_rest_1 = require("typescript-rest");
const path_1 = __importDefault(require("path"));
class App {
    constructor() {
        this.routePrv = new crmRoutes_1.Routes();
        this.routePrv1 = new userRoutes_1.UserRoutes();
        this.imageUplaodRoutes = new imageUploadRoutes_1.ImageUploadRoutes();
        this.mongoUrl = 'mongodb://localhost/CRMdb';
        // public mongoUrl: string = "mongodb://Aashish:123456@localhost:27017/CRMdb";
        this.server = null;
        this.app = express_1.default();
        this.config();
        this.routePrv.routes(this.app);
        this.routePrv1.userRoutes(this.app);
        this.imageUplaodRoutes.imageUplaodRoutes(this.app);
        this.mongoSetup();
        // process.env['NODE_CONFIG_DIR'] = __dirname + '../config';
        typescript_rest_1.Server.swagger(this.app, {
            endpoint: 'api-docs',
            filePath: path_1.default.resolve(process.cwd(), './swagger.json'),
            host: 'http://localhost:3000',
            schemes: ['http'],
        });
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    mongoSetup() {
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(this.mongoUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true,
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map