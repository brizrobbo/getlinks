/******************************************************************************

Script: main.js

Purpose: Provides an API end-point that simply takes a supplied URL (as a JSON
object - see below) and then performs a GET request on that URL and returns all
the links as a JSON array. The returned array is de-duped and sorted. The links
returned are also made 'absolute' where they are 'root-relative'.

Typical request format:

{
    "url":"http://somedomain.com/index.html"
}

******************************************************************************/

// Using express as web server framework
var express = require('express');
var bodyParser = require('body-parser')

// Call in getLinks.js which does most of the work
var getTheseLinks = require('./getLinks.js');

// Initialise the express app and set web server port
var app = express();
var ws_port = '3000';

// Set some express options - parse application/json
app.use(bodyParser.json());

// GET route is not allowed. Provide a response if a GET request is performed.
app.get('/', function (req, res) {
    res.send('<html><head><title>getLinks Error</title></head><body><p>This service only allows POST requests.</p></body></html>');
});

// Handle the POST route
app.post('/', function (req, res) {

    var incomingUrl = req.body["url"]; //the url to query is obtained from the JSON POST body

    //get the links
    getTheseLinks.getLinks(incomingUrl, function logMyLinks() {

        //de-dupe listOfLinks
        var uniqListOfLinks = [...new Set(listOfLinks)];

        //sort alphabetically
        var sortedUniqListOfLinks = uniqListOfLinks.sort();

        //turn array into string and return as reponse
        var listOfLinks_JSON = JSON.stringify(uniqListOfLinks);
        res.send(listOfLinks_JSON);

    });

});

// Web server listening on nominated port
var server = app.listen(ws_port, function () {
    var host = 'localhost';
    console.log('getlinks API listening at http://%s:%s', host, ws_port);
});