import bcrypt from "bcrypt-nodejs";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/passportHandler";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";
const logger = require("../winston/winston");
let sendMail = require('../util/mailSender');
import config = require('config');

export class UserController {

  public async registerUser(req: Request, res: Response): Promise<void> {
    logger.info("registerUser controller")
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      phone: req.body.phone,

    });
    // Here we are calling sending mail helper method
    if (req.body.email) {
      await sendMail.sendMail({to:req.body.email});
    }
    // Here we are calling sending smd helper method
    const token = jwt.sign({ username: req.body.username, scope : req.body.scope }, JWT_SECRET);
    res.status(200).send({ token: token });
  }

 async  authenticateUser(req: Request, res: Response, next: NextFunction) {
   console.log("to check congif var",config.get('logLevel'));
   
    passport.authenticate("local", function (err, user, info) {
      // no async/await because passport works only with callback ..
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        const token = jwt.sign({ username: user.username }, JWT_SECRET);
        res.status(200).send({ token: token });
      }
    })(req,res,next);
  }






}