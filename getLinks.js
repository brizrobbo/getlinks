//consider vars as "mailboxes"
var exports = module.exports = {};

var request = require('request');
var cheerio = require('cheerio');

exports.getLinks = function (incomingUrl, callback) {
    //Empty array to hold links
    listOfLinks = new Array();

    request.get(incomingUrl, function doneGetting(error, response, body) {

        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }

        $ = cheerio.load(body);

        //jquery get all hyperlinks
        links = $('a');
        $(links).each(function (i, link) {
            //console.log('HREF:' + $(link).attr('href'));
            listOfLinks.push($(link).attr('href'));
        });

        callback();
    });

    return (listOfLinks);
};