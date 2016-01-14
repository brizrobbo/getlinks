/******************************************************************************

Script: getLinks.js

Purpose: Provides an API end-point that simply takes a supplied URL (as a JSON
object - see below) and then performs a GET request on that URL and returns all
the links as a JSON array. The returned array is de-duped and sorted. The links
returned are also made 'absolute' where they are 'root-relative'.

Typical request format:

{
    "url":"http://somedomain.com/index.html"
}

******************************************************************************/

// export as a module
var exports = module.exports = {};

// Using request and cheerio libs
var request = require('request');
var cheerio = require('cheerio');

// Perform work
exports.getLinks = function (incomingUrl, callback) {

    //Empty array to hold links
    listOfLinks = new Array();

    request.get(incomingUrl, function doneGetting(error, response, body) {

        if (error) {
            return console.log('Error:', error);
        }

        //Check for right status code
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned: %d. URL requested: %s', response.statusCode, incomingUrl);
        }

        $ = cheerio.load(body);

        //jquery: get all hyperlinks
        links = $('a');
        $(links).each(function (i, link) {
            var thisLink = $(link).attr('href');
            var bookmarkRegex = /^\#/; //begins with #
            var mailtoRegex = /^mailto/; //begins with mailto
            var javascriptRegex = /^javascript/; //begins with javascript

            if (bookmarkRegex.test(thisLink)) { //only wanting it to select proper links (i.e. no bookmarks)
                //do nothing
            } else if (mailtoRegex.test(thisLink)) { //only wanting it to select proper links (i.e. no bookmarks)
                //do nothing
            } else if (javascriptRegex.test(thisLink)) { //only wanting it to select proper links (i.e. no bookmarks)
                //do nothing
            } else {
                listOfLinks.push(thisLink);
            }

        });

        //jquery: get all images
        images = $('img');
        $(images).each(function (i, image) {
            var thisImage = $(image).attr('src');

            listOfLinks.push(thisImage);

        });

        callback();
    });

    return (listOfLinks);
};