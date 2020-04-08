// import * as express from "express";
import express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import { UserRoutes } from "./routes/userRoutes";
import mongoose from "mongoose";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public routePrv1: UserRoutes = new UserRoutes();
  // public mongoUrl: string = 'mongodb://localhost/CRMdb';
  public mongoUrl: string = "mongodb://Aashish:123456@localhost:27017/CRMdb";

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.routePrv1.userRoutes(this.app);
    this.mongoSetup();
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
