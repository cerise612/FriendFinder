
var userData = require("../data/friends");
var bodyParser = require("body-parser");

// ROUTING

module.exports = function(app) {
  // Sets up the Express app to handle data parsing
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Capture the form inputs
  app.get("#submit", function(event) {
    event.preventDefault();

    // Form validation
    function validateForm() {
      var isValid = true;
      $("#submit").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });

      $("#submit").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });
      return isValid;
    }

    // If all required fields are filled
    if (validateForm()) {
      // Create an object for the user"s data
      var userData = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: [
          $("#q1").val(),
          $("#q2").val(),
          $("#q3").val(),
          $("#q4").val(),
          $("#q5").val(),
          $("#q6").val(),
          $("#q7").val(),
          $("#q8").val(),
          $("#q9").val(),
          $("#q10").val()
        ]
      }.then( function(){var totalScore =
        parseInt("#q1") + parseInt("#q2") + parseInt("#q3") + parseInt("#q4")  + parseInt("#q5")  + parseInt("#q6")  + parseInt("#q7")  + parseInt("#q8")  + parseInt("#q9") + parseInt("#q10")
      });

      

      // API GET Request

      app.get("../app/public#submit", function(req, res) {
        res.json(userData);
      });


      // API POST Requests
      app.post("../data/friends", userData, function(data) {
        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $("#match-name").text(data.name);
        $("#match-img").attr("src", data.photo);

        // Show the modal with the best match
        $("#results-modal").modal("toggle");
      });
    } else {
      alert("Please fill out all fields before submitting!");
    }
  });
};
