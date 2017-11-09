(function() {
  angular.module("BlogApp", []).controller("BlogController", BlogController);

  function BlogController($scope, $http) {
    $scope.createPost = createPost;
    $scope.deletePost = deletePost;
    $scope.editPost = editPost;
    $scope.updatePost = updatePost;

    function init() {
      getAllPosts();
    }
    init();

    function updatePost(post) {
      $http.put("/blogpost/" + post._id, post).then(getAllPosts);
    }

    function getAllPosts() {
      $http.get("/blogpost").then(function(posts) {
        var post = Object.values(posts)[0];
        $scope.posts = post;
      });
    }

    function createPost(post) {
      $http.post("/blogpost", post);
      getAllPosts();
    }
    function deletePost(postId) {
      $http.delete("/blogpost/" + postId).then(getAllPosts);
    }
    function editPost(postId) {
      $http.get("/blogpost/" + postId).then(function(post) {
        var post = Object.values(post)[0];
        $scope.post = post;
      });
    }
  }
})();
