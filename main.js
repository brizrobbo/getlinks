var express = require('express');
var bodyParser = require('body-parser')

var getTheseLinks = require('./getLinks.js');

var app = express();

// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('<p>This service only allows POST requests.</p>');
});

app.post('/', function (req, res) {

    //console.log("URI: " + req.body["uri"]) // populated!
    var incomingUrl = req.body["uri"];

    getTheseLinks.getLinks(incomingUrl, function logMyLinks() {
        var listOfLinks_JSON = JSON.stringify(listOfLinks);
        res.send(listOfLinks_JSON);
        //console.log(listOfLinks_JSON);
    });

});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});