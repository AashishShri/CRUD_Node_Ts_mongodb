import { Image } from "../models/imageUploadModel";
import config = require("config");
import { Request, Response } from "express";
import del = require('del');
import * as path from 'path'
import * as fs from 'fs'
const logger = require("../winston/winston");

export class ImageUploadController {
  
  public getUploadedImage(req, res, next)  {
    // use lean() to get a plain JS object
    // remove the version key from the response
    Image.find({}, '-__v').lean().exec((err, images) => {
        if (err) {
            res.sendStatus(400);
        }
 
        // Manually set the correct URL to each image
        for (let i = 0; i < images.length; i++) {
            var img = images[i];
            img.url = req.protocol + '://' + req.get('host') + '/image/' + img._id;
        }
        res.json(images);
    })
}
  
  public uploadImage(req, res, next)  {
    // Create a new image model and fill the properties
    let newImage = new Image();
    newImage.filename = req.file.filename;
    newImage.originalName = req.file.originalname;
    newImage.desc = req.body.desc
    newImage.save(err => {
        if (err) {
            return res.sendStatus(400);
        }
        res.status(201).send({ newImage });
    });
}
  
  public getImageWithID(req, res, next)  {
    let imgId = req.params.imageId;
 
    Image.findById(imgId, (err, image) => {
        if (err) {
            res.sendStatus(400);
        }
        // stream the image back by loading the file
        res.setHeader('Content-Type', 'image/jpeg');
        console.log("testing",path.join(config.get("UPLOAD_PATH"), image.filename));
        
        fs.createReadStream(path.join(config.get("UPLOAD_PATH"), image.filename)).pipe(res);
    })
}
 
  public updateUploadedImage(req: Request, res: Response) {
    logger.info("Initaiated update image upoad");
    Image.findOneAndUpdate(
      { _id: req.params.imageId },
      req.body,
      { new: true },
      (err, image) => {
        if (err) {
          res.send(err);
        }
        res.json(image);
      }
    );
  }
 
  public deleteUploadedImage(req, res, next)  {
    let imgId = req.params.imageId;
 
    Image.findByIdAndRemove(imgId, (err, image) => {
        if (err && image) {
            res.sendStatus(400);
        }
 
        del([path.join(config.get("UPLOAD_PATH"), image.filename)]).then(deleted => {
            res.sendStatus(200);
        })
    })
}
}
