var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function (req, res, next) {

    // var $ = cheerio.load('<h1 class="title">Welcome to Express</h1>');
    //
    // $('.title').css('color','blue');
    // $('.title').addClass('welcome');
    // $('.welcome').css('font-size','5em');
    // $('<h2 class="school">school of net</h2>').prependTo('.title');

    // res.send($.html());
    // request('https://br.search.yahoo.com/search;_ylt=AwrBTvdZe49YZscAZRry6Qt.;_ylc=X1MDMjExNDcxMDAwMgRfcgMyBGZyAwRncHJpZANhb0Y4d28wSlJzV19rT2pUekMxOHVBBG5fcnNsdAMwBG5fc3VnZwMyBG9yaWdpbgNici5zZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDBHFzdHJsAzE3BHF1ZXJ5A3NjaG9vbCUyMG9mJTIwbmV0BHRfc3RtcAMxNDg1Nzk4Mjcx?p=school+of+net&fr=sfp&fr2=sb-top-br.search&iscqry=', function (error, response, body) {
    //     if (error || response.statusCode != 200) {
    //         return;
    //     }
    //
    //     res.render('index', {
    //         title: 'Express',
    //         body: body
    //     });
    // })

    var options = {
        url: 'http://www.themovieblog.com/category/features/reviews/',
        method: 'GET'
    };

    request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
            return;
        }

        var $ = cheerio.load(body);

        var arr = [];
        var postItem = $('.genaral-post-item');

        $(postItem).each(function (key, el) {
            var item = el;

            var headerTitle = $(item).find('.genpost-entry-header > .genpost-entry-title > a');
            var content     = $(item).find('.genpost-entry-content > p');
            var moreTag     = $(content).find('a');

            return arr.push({
                header: $(headerTitle).text(),
                content: {
                    text : $(content).text(),
                    more: $(moreTag).attr('href')
                }
            });
        });

        res.status(200).json(arr);
    })


});

module.exports = router;
