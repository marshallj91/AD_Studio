var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog");

//****************Mongo API****************//

var PostSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    posted: { type: Date, default: Date.now },
    url: { type: String, required: true }
  },
  { collection: "post" }
);

var PostModel = mongoose.model("PostModel", PostSchema);
//******************Blog Route ******************//

module.exports = {
  updatepost: function updatePost(req, res) {
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
  },

  getPostById: function getPostById(req, res) {
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
  },

  deletePost: function deletePost(req, res) {
    var postId = req.params.id;
    PostModel.remove({ _id: postId }).then(
      function(status) {
        res.sendStatus(200);
      },
      function() {
        res.sendStatus(400);
      }
    );
  },

  getAllPosts: function getAllPosts(req, res) {
    PostModel.find().then(
      function(posts) {
        res.json(posts);
      },
      function(err) {
        res.sendStatus(400);
      }
    );
  },

  createPost: function createPost(req, res) {
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
};
