$(function() {
  $("#name_error_message").hide();
  $("#email_error_message").hide();
  $("#telephone_error_message").hide();
  $("#body_error_message").hide();

  var error_name = false;
  var error_email = false;
  var error_telephone = false;
  var error_body_message = false;

  $("#name").focusout(function() {
    check_name();
  });

  $("#email").focusout(function() {
    check_email();
  });

  $("#tel").focusout(function() {
    check_telephone();
  });

  $("#message").focusout(function() {
    check_message();
  });

  function check_name() {
    var name_length = $("#name").val().length;

    if (name_length < 2) {
      $("#name_error_message").html(
        "Your Name should be greater than 2 characters."
      );
      $("#name_error_message").show();
      error_name = true;
    } else {
      $("#name_error_message").hide();
    }
  }

  function check_email() {
    var pattern = new RegExp(
      /^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i
    );

    if (pattern.test($("#email").val())) {
      $("#email_error_message").hide();
    } else {
      $("#email_error_message").html("Invalid email address");
      $("#email_error_message").show();
      error_email = true;
    }
  }

  function check_telephone() {
    var Phone = $("#tel")
      .val()
      .replace(/\D+/g, "");

    if (Phone.length != 10) {
      $("#telephone_error_message").html("Phone number must be 10 digits");
      $("#telephone_error_message").show();
      error_telephone = true;
    } else {
      $("#telephone_error_message").hide();
    }
  }

  function check_message() {
    var message_length = $("#message").val().length;

    if (message_length == 0) {
      console.log(message_length);
      $("#body_error_message").html("Please enter a message");
      $("#body_error_message").show();
      error_message = true;
    } else {
      $("#body_error_message").hide();
    }
  }

  // $("#contact_form").submit(function() {
  $("#submitForm").on("click", function() {
    error_name = false;
    error_email = false;
    error_telephone = false;
    error_message = false;

    check_name();
    check_email();
    check_telephone();
    check_message();

    console.log("Before If Statement");

    if (
      error_name == false &&
      error_email == false &&
      error_telephone == false &&
      error_message == false
    ) {
      var name = $("#name").val();
      var telephone = $("#tel").val();
      var email = $("#email").val();
      var message = $("#message").val();
      $.ajax({
        //Development URLS
        //url: "https://192.168.111.141:443/ad",
        //url: "http://68.129.102.93:3000/ad",
        //url: "http://192.168.1.8:3000/contact",

        //Production Link
        url: "http://47.23.72.12:3000/contact",

        // Add headers
        //headers: { 'Access-Control-Allow-Headers': 'Content-Type, x-requested-with, Authorization, Access-Control-Allow-Origin': },
        //headers: { 'Access-Control-Allow-Methods': 'GET, OPTIONS': },
        //headers: { 'Access-Control-Allow-Origin': '*': },
        //headers: { 'Access-Control-Max-Age': '360': },
        //Header property: Access-Control-Allow-Origin: *,
        method: "POST",
        timeout: 5000,
        data: {
          name: name,
          telephone: telephone,
          email: email,
          message: message
        },
        success: function() {
          console.log("Return Success");
          $("#successModal").modal("show");
          $("#submitForm").attr("disabled", true);
        },
        error: function() {
          console.log("Return Error");
          $("#failureModal").modal("show");
        }
      });
    } else {
      //Please tell user to enter required fields here.
      return false;
    }
  });
});
