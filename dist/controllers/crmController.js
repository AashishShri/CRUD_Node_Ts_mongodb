"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const crmModel_1 = require("../models/crmModel");
const logger = require("../winston/winston");
const Contact = mongoose.model("Contact", crmModel_1.ContactSchema);
const fs = require("fs");
const fastcsv = require("fast-csv");
let stream = fs.createReadStream("lib/controllers/contacts.csv");
class ContactController {
    addNewContact(req, res) {
        logger.info("Initaiated addNewContact");
        let newContact = new Contact(req.body);
        newContact.save((err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    addBulkContact(req, res) {
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
            Contact.insertMany(csvData, (err, contact) => {
                if (err) {
                    res.send(err);
                }
                res.json({ "success": `Inserted: ${contact.insertedCount} rows` });
                // if (err) throw err;
                // console.log(`Inserted: ${contact.insertedCount} rows`);
            });
        });
        stream.pipe(csvStream);
    }
    getContacts(req, res) {
        logger.info("Initaiated getContacts");
        Contact.find({}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    getContactWithID(req, res) {
        logger.info("Initaiated getContactWithID");
        Contact.findById(req.params.contactId, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    updateContact(req, res) {
        logger.info("Initaiated updateContact");
        Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }
    deleteContact(req, res) {
        logger.info("Initaiated deleteContact");
        Contact.remove({ _id: req.params.contactId }, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted contact!" });
        });
    }
}
exports.ContactController = ContactController;
//# sourceMappingURL=crmController.js.map