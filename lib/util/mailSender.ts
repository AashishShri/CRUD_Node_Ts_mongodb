import config = require("config");
var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  auth: {
    user: config.get("mailAuth.user"),
    pass: config.get("mailAuth.password"),
  },
});

async function sendMail(userDetails) {
  console.log("I m here for sending mail for you", userDetails);
  var mailOptions = {
    to: userDetails.to,
    subject: "Successfully! ",
    text: "Successfully! received mail using nodejs",
  };
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      throw error;
    } else {
      console.log("Message sent: " + response.message);
    }
  });
}

module.exports.sendMail = sendMail;
