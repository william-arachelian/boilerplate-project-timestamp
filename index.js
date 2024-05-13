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
    let timestamp = currDate.getTime();
    let dateString = currDate.toUTCString();

    return res.json({unix: timestamp, utc: dateString});
});

app.get("/api/:date?", function(req, res) {
  try {
    let date_string = req.params.date;
    let dateObj;
    let timestamp;
    let dateString;

    if (!date_string.includes("-")) {
      dateObj = new Date(parseInt(date_string));
    }
    
    else dateObj = new Date(date_string);
    if (isNaN(dateObj.getTime())) throw "Invalid Date";

    timestamp = dateObj.getTime();
    dateString = dateObj.toUTCString();

    return res.json({unix: timestamp, utc: dateString});
  }
  catch(e) {
    return res.json({ error : e });
  }
 
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
