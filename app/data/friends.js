var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'friendFinder'
});

connection.connect();

// query all to display database of existing users
query = connection.query("SELECT * FROM userData", function(error, res) {
  if (error) {
    throw error;
    console.log(error);
  } else {
    results = res;
    for (var i = 0; i < results.length; i++) {
      // show results
      console.log(
        results[i].id +
          " | " +
          results[i].name +
          " | " +
          results[i].photo +
          " | " +
          results[i].Q1 +
          " | " +
          results[i].Q2 +
          " | " +
          results[i].Q3 +
          " | " +
          results[i].Q4 +
          " | " +
          results[i].Q5 +
          " | " +
          results[i].Q6 +
          " | " +
          results[i].Q7 +
          " | " +
          results[i].Q8 +
          " | " +
          results[i].Q9 +
          " | " +
          results[i].Q10 +
          " | " +
          results[i].totalScore);
    };
  };
});

var userData= [
  {
  "name": "Ahmed",
  "photo": "https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAq7AAAAJDAwYzI4NTQ4LWYwZWUtNGFkYS1hNTYwLTZjYzkwY2ViZDA3OA.jpg",
  "scores": [
  "5",
  "1",
  "4",
  "4",
  "5",
  "1",
  "2",
  "5",
  "4",
  "1"
  ]
  },
]
