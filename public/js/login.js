(function() {
  angular.module("LoginApp", []).controller("LoginController", LoginController);

  function LoginController($scope, $http) {
    var service = {
      // createUser: createUser,
      loginUser: loginUser
    };

    // function createUser(user, callback) {
    //   $http.post("/rest/register", user).then(callback);
    //
    // }

    function loginUser(user, callback) {
      $http.post("/rest/login", user).then(callback);
      console.log(JSON.stringify(user));
    }
  }
})();
