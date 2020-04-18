"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crmController_1 = require("../controllers/crmController");
const authController_1 = require("../controllers/authController");
class Routes {
    constructor() {
        this.contactController = new crmController_1.ContactController();
        this.authController = new authController_1.AuthController();
    }
    routes(app) {
        console.log("This is crn routes");
        // Routes
        app.route("/").get((req, res) => {
            res.status(200).send({
                message: "GET request successfulll!!!!",
            });
        });
        // app.use(this.authController.authenticateJWT)
        // Get all contacts
        app.route("/contact").get(this.authController.authenticateJWT, this.contactController.getContacts);
        // Create a new contact
        app.route("/contact").post(this.authController.authenticateJWT, this.contactController.addNewContact);
        app.route("/contact/bulk").post(this.contactController.addBulkContact);
        // get a specific contact
        app
            .route("/contact/:contactId")
            .get(this.authController.authenticateJWT, this.contactController.getContactWithID)
            .put(this.authController.authenticateJWT, this.contactController.updateContact)
            .delete(this.authController.authenticateJWT, this.contactController.deleteContact);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=crmRoutes.js.map