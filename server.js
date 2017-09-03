var express = require('express');
var moment = require('moment');
var app = express();
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
app.get('/:time', function(req, res) {
  var time
  if (/^d{10}$/.test(req.params.time)) {
    time = moment(req.params.time, "X");
  } else {
    time = moment(req.params.time, "MMMM DD, YYYY");
  }
  if (time.isValid()) {
      res.json({
        unix: time.format('X'),
        natural: time.format("MMMM DD, YYYY")
      })
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});
app.listen(process.env.PORT);