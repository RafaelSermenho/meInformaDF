var twit = require('twit');
var https = require("https");
var express = require('express');
var bodyParser = require('body-parser');

var config = require('./config.js');
var packageInfo = require('./package.json');

var app = express();
var Twitter = new twit(config);

app.use(bodyParser.json());
app.get('/meInformaDF', function (req, res) {
    res.json({name: "Me Informa DF", version: packageInfo.version});
})

var server = app.listen(8084, "127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Web server started at http://%s:%s', host, port);
});


var tweetStream = Twitter.stream('statuses/filter', { follow: '762000431916654592, 170012953, 282066682'});

// on tweet
tweetStream.on('tweet', function (tweet) {
    console.log(tweet);
	Twitter.post('statuses/retweet', {id: tweet.id_str}, function (error, tweet, response) {
        if (error) {
            console.log(error);
        }
    });
});