import * as mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";
import { Request, Response } from "express";
const logger = require("../winston/winston");
const Contact = mongoose.model("Contact", ContactSchema);
const fs = require("fs");
const fastcsv = require("fast-csv");
let stream = fs.createReadStream("lib/controllers/contacts.csv");



export class ContactController {
  public addNewContact(req: Request, res: Response) {
    logger.info("Initaiated addNewContact");
    let newContact = new Contact(req.body);
    newContact.save((err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  /**
   * This endpoint is use for bulk insert data
   * @param req 
   * @param res 
   */
  public addBulkContact(req: Request, res: Response) {
    logger.info("Initaiated addBulkContact");
    let csvData = [];
    let csvStream = fastcsv
      .parse()
      .on("data", function (data) {
        csvData.push({
          firstName: data[0],
          lastName: data[1],
          email: data[2],
          company: data[3],
          phone: data[4],
        });
      })
      .on("end", function () {
        // remove the first line: header
        csvData.shift();
        console.log(csvData);
        Contact.insertMany(csvData,(err, contact) => {
          if (err) {
            res.send(err);
          }
          res.json({"success":` Successfully inserted  rows`});
        });
      });
    stream.pipe(csvStream);
  }

  public getContacts(req: Request, res: Response) {
    logger.info("Initaiated getContacts");
    Contact.find({}, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  public getContactWithID(req: Request, res: Response) {
    logger.info("Initaiated getContactWithID");
    Contact.findById(req.params.contactId, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json(contact);
    });
  }

  public updateContact(req: Request, res: Response) {
    logger.info("Initaiated updateContact");
    Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true },
      (err, contact) => {
        if (err) {
          res.send(err);
        }
        res.json(contact);
      }
    );
  }

  public deleteContact(req: Request, res: Response) {
    logger.info("Initaiated deleteContact");
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "Successfully deleted contact!" });
    });
  }
}
