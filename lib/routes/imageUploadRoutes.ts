import { ImageUploadController } from "../controllers/imageUploadController";
let Imageupload = require('../util/imageUpload');
 


export class ImageUploadRoutes {
    public imageUploadController: ImageUploadController = new ImageUploadController();
    
    public imageUplaodRoutes(app): void {
      console.log("This is imageUplaodRoutes Called");
      // Routes
      
      app.route("/image").get(this.imageUploadController.getUploadedImage);
      // Create a new image details
      app.route("/image").post(Imageupload.upload.single('image'),this.imageUploadController.uploadImage);
  
      // get a specific contact
      app
        .route("/image/:imageId")
        .get(this.imageUploadController.getImageWithID)
        .put(this.imageUploadController.updateUploadedImage)
        .delete(this.imageUploadController.deleteUploadedImage);
    }
  }
