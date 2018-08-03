var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

  
      for (var selector in config) {
        $(selector).chosen(config[selector]);
      }
  
      // Capture the form inputs
      $("#submitButton").on("click", function(event) {
        event.preventDefault();
  
        // Form validation
        function validateForm() {
          var isValid = true;
          $(".form-control").each(function() {
            if ($(this).val() === "") {
              isValid = false;
            }
          });
  
          $(".chosen-select").each(function() {
  
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
          };
  
          // AJAX post the data to the friends API.
          $.post("/api/friends", userData, function(data) {
  
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


      // Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});