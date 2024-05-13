// index.js
// where your node app starts
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api", function(req, res) {

    let currDate = new Date();
    let timestamp = currDate.valueOf();
    let dateString = currDate.toUTCString();

    return res.json({unix: timestamp, utc: dateString});
});

app.get("/api/:date", function(req, res) {
  try {
    let timestamp;
    let dateString;

    if (isValidUnix(req.params.date)) {
      timestamp = parseInt(req.params.date);
      dateString = new Date(timestamp).toUTCString();
    }
    else if (isValidDate(req.params.date)) {
      let date = new Date(req.params.date);
      timestamp = date.valueOf();
      dateString = date.toUTCString();

    }

    else throw "Invalid Date";

    return res.json({unix: timestamp, utc: dateString});
  }
  catch(e) {
    return res.json({ error : "Invalid Date" });
  }
 

});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


let isValidDate = (input) => {
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (typeof input != 'string') return false;
  if (input.split("-").length != 3) return false;

  //preprocessing input
  let dateSplit = input.split("-");
  if (dateSplit[1].length == 1) dateSplit[1] = "0" + dateSplit[1];
  if (dateSplit[2].length == 1) dateSplit[2] = "0" + dateSplit[1];

  let year = parseInt(dateSplit[0]);
  let month = parseInt(dateSplit[1]);
  let day = parseInt(dateSplit[2]);

  let currentYear = new Date().getFullYear();

  //year validation
  if (dateSplit[0].length != 4 || year == NaN) return false;
  if (year > currentYear) return false;

  //month validation
  if (dateSplit[2].length != 2 || month == NaN) return false;
  if (month < 1 || month > 12) return false;

  //day validation
  if (dateSplit[2].length != 2 || day == NaN) return false;
  //leap year
  if (month == 2 && year % 4 == 0) {
    if (day < 1 || day > 29) return false;
  }
  else if (day < 1 || day > daysInMonth[month - 1]) return false;

  return true;
};

let isValidUnix = (input) => {
  if (typeof input != 'string') return false;
  if (parseInt(input) == NaN) return false
  if (input.length != 13) return false
  return true;

};