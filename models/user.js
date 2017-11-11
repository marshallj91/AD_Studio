var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/AD_Studio");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
  },
  { collection: "users" }
);

var User = mongoose.model("UserModel", UserSchema);

module.exports = User;
