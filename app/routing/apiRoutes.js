// require('handlebars');
// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on survey results.
// ===============================================================================

var userData = require("../data/friends");

var bodyParser = require("body-parser");

// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
  // Sets up the Express app to handle data parsing
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  var config = {
    ".chosen-select": {},
    ".chosen-select-deselect": {
      allow_single_deselect: true
    },
    ".chosen-select-no-single": {
      disable_search_threshold: 10
    },
    ".chosen-select-no-results": {
      no_results_text: "Oops, nothing found!"
    },
    ".chosen-select-width": {
      width: "95%"
    }
  };

  for (var selector in config) {
    $(selector).chosen(config[selector]);
  }

  // Capture the form inputs
  app.get("/submit", function(event) {
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
      }.then( function(){var totalScore =
        parseInt("#q1") + parseInt("#q2") + parseInt("#q3") + parseInt("#q4")  + parseInt("#q5")  + parseInt("#q6")  + parseInt("#q7")  + parseInt("#q8")  + parseInt("#q9") + parseInt("#q10")
      });

      

      // API GET Requests
      // Below code handles when users "visit" a page.
      // In each of the below cases when a user visits a link
      // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
      // ---------------------------------------------------------------------------

      app.get("../app/public/survey", function(req, res) {
        res.json(userData);
      });


      // API POST Requests
      // Below code handles when a user submits a form and thus submits data to the server.
      // In the below case, when a user submits form data (a JSON object)
      // ...the JSON is pushed to the JavaScript array
      // (ex. User fills out a survey... this data is then sent to the server...
      // Then the server saves the data to the userData array)
      // ---------------------------------------------------------------------------
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
