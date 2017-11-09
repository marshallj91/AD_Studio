var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog");
var express = require("express");
var app = express();
var router = express.Router();
// var model = require("../models/blog");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//************ Route Handing  *************//

router.post("/", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

//****************Mongo API****************//

var PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    posted: { type: Date, default: Date.now },
    url: { type: String, required: true }
  },
  { collection: "post" },
  { versionKey: false }
);

var PostModel = mongoose.model("PostModel", PostSchema);
//******************Blog DB Functions ******************//

function updatePost(req, res) {
  var postId = req.params.id;
  var post = req.body;
  PostModel.update(
    { _id: postId },
    {
      title: post.title,
      body: post.body
    }
  ).then(
    function(status) {
      res.sendStatus(200);
    },
    function(err) {
      res.sendStatus(400);
    }
  );
}

function getPostById(req, res) {
  var postId = req.params.id;
  PostModel.findById(postId).then(
    function(post) {
      res.json(post);
      console.log(post);
    },
    function(err) {
      res.sendStatus(400);
      console.log("Error retrieveing Post.");
    }
  );
}

function deletePost(req, res) {
  var postId = req.params.id;
  PostModel.remove({ _id: postId }).then(
    function(status) {
      res.sendStatus(200);
    },
    function() {
      res.sendStatus(400);
    }
  );
}

function getAllPosts(req, res) {
  PostModel.find().then(
    function(posts) {
      res.json(posts);
    },
    function(err) {
      res.sendStatus(400);
    }
  );
}

function createPost(req, res) {
  var post = req.body;
  console.log(post);
  PostModel.create(post).then(
    function(postObj) {
      res.json(200);
    },
    function(error) {
      res.sendStatus(400);
    }
  );
}

module.exports = router;
