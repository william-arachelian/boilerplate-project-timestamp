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


app.get("/api", function(req, res) {

    let currDate = new Date();
    return res.json({unix: currDate.getTime(), utc: currDate.toUTCString()});
});

app.get("/api/:date?", function(req, res) {
  try {
    let dateObj = new Date(req.params.date);

    if (dateObj.toUTCString() === "Invalid Date") {
      dateObj = new Date(parseInt(req.params.date));
    }
    
    if (dateObj.toUTCString() === "Invalid Date") throw "Invalid Date";

    return res.json({unix: dateObj.getTime(), utc: dateObj.toUTCString()});
  }
  catch(e) {
    return res.json({ error : e});
  }
 
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
