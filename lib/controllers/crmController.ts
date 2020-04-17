import * as mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel";
import { Request, Response } from "express";
const logger = require("../winston/winston");
const Contact = mongoose.model("Contact", ContactSchema);

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
