// import * as express from "express";
import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import { UserRoutes } from "./routes/userRoutes";
import { ImageUploadRoutes } from "./routes/imageUploadRoutes";
// import * as swaggerUi from 'swagger-ui-express';
import mongoose from "mongoose";
import { Server } from 'typescript-rest';
import config from 'config';
import path from 'path';
import http from 'http';


class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public routePrv1: UserRoutes = new UserRoutes();
  public imageUplaodRoutes: ImageUploadRoutes = new ImageUploadRoutes();
  public mongoUrl: string = 'mongodb://localhost/CRMdb';
  // public mongoUrl: string = "mongodb://Aashish:123456@localhost:27017/CRMdb";
  private server: http.Server = null;
  

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.routePrv1.userRoutes(this.app);
    this.imageUplaodRoutes.imageUplaodRoutes(this.app);
    this.mongoSetup();
    // process.env['NODE_CONFIG_DIR'] = __dirname + '../config';
    Server.swagger(this.app, {
      endpoint: 'api-docs',
      filePath: path.resolve(process.cwd(), './swagger.json'),
      host: 'http://localhost:3000',
      schemes: ['http'],
    });
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}


export default new App().app;
