var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var nodemailer = require("nodemailer");
//var fs = require("fs");
var blogpost = require("./routers/blog");
//var https = require('https');

//var httpsOptions = {
//  key: fs.readFileSync('keys/key.pem'),
//  cert: fs.readFileSync('keys/cert.pem')
//}
app.use("/blogpost", blogpost);
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//***************Contact Form Handler*****//
app.post("/contact", function(req, resp) {
  var name = req.body.name;
  var email = req.body.email;
  var telephone = req.body.telephone;
  var message = req.body.message;

  console.log(
    "name = " +
      name +
      "\n" +
      "email = " +
      email +
      "\n" +
      "telephone = " +
      telephone +
      "\n" +
      "message = " +
      message
  );

  resp.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  resp.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  resp.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  resp.setHeader("Access-Control-Allow-Credentials", true);

  var transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    port: 80,
    secure: false,
    auth: {
      user: "support@indcon.com",
      pass: "icspwd1"
    }
  });

  var mailOptions = {
    from: '"AD Studio" <support@indcon.com>"',
    to: "alexdwek@msn.com",
    subject: "Contact Submission",
    text:
      "name = " +
      name +
      "\n" +
      "email = " +
      email +
      "\n" +
      "telephone = " +
      telephone +
      "\n" +
      "message : " +
      "\n" +
      message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
      resp.send(error);
    } else {
      resp.send(info);
      //console.log(info);
      console.log("Message %s sent: %s", info.messageId, info.response);
    }
  });
});

app.listen(3000, function() {
  console.log("Email Server listening on port 3000!");
});
//https.createServer(httpsOptions, app).listen(443);
//console.log('https listening on port 443')
