import multer = require('multer');
import config = require("config");

// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.get("UPLOAD_PATH"))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

// export let upload = multer({ storage: storage })
module.exports.upload = multer({ storage: storage });