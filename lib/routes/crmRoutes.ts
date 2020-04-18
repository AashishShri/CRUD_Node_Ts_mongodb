import { Request, Response } from "express";
import { ContactController } from "../controllers/crmController";
import { AuthController } from "../controllers/authController";

export class Routes {
  public contactController: ContactController = new ContactController();
  public authController: AuthController = new AuthController();
  
  public routes(app): void {
    console.log("This is crn routes");
    // Routes

    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!",
      });
    });
    // app.use(this.authController.authenticateJWT)

    // Get all contacts
    
    app.route("/contact").get(this.authController.authenticateJWT,this.contactController.getContacts);
    // Create a new contact
    app.route("/contact").post(this.authController.authenticateJWT,this.contactController.addNewContact);

    app.route("/contact/bulk").post(this.contactController.addBulkContact);

    // get a specific contact
    app
      .route("/contact/:contactId")
      .get(this.authController.authenticateJWT,this.contactController.getContactWithID)
      .put(this.authController.authenticateJWT,this.contactController.updateContact)
      .delete(this.authController.authenticateJWT,this.contactController.deleteContact);
  }
}
