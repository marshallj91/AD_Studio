var express = require("express");
var router = express.Router();
var User = require("../models/user");

router.post("/login", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  //User.User.save();
});

module.exports = router;
