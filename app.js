/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function () {
    'use strict';

    var express = require('express'),
        env = require('node-env-file'),
        path = require('path'),
        request = require('request'),//.defaults({proxy:'http://localhost:8888'}),
        trumpet = require('trumpet'),
        extend = require('extend'),
        through = require('through2'),
        url = require('url'),
        fs = require('fs'),
        noop = function (chunk, enc, cb) {
            cb(null, chunk);
        },
        app = express();

    env(path.join(__dirname, '.env'));

    var port = process.env.PORT,
        target = process.env.TARGET,
        host = url.parse(target).host;

    app.listen(port, function () {
        console.log('listening on port %s', port);
    });

    app.use('/components', express.static(path.join(__dirname, 'components')));
    app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

    app.use(function (req, res) {
        var tr = trumpet();
        tr.pipe(res);
        res.removeHeader('Content-Length');
        var headStream = tr.select('head').createStream(),
            bodyStream = tr.select('body').createStream(),
            heatMapComponentStream = fs.createReadStream('components/heatmap/index.html');

        headStream.pipe(through(noop, function (cb) {
            var self = this;
            heatMapComponentStream.on('data', this.push.bind(self));
            heatMapComponentStream.on('end', cb);
            heatMapComponentStream.on('error', cb);
        })).pipe(headStream);

        bodyStream.pipe(through(noop, function (cb) {
            this.push('<div id="heatMapContainer"></div>');
            cb();
        })).pipe(bodyStream);

        request({
            method: req.method,
            uri: target + req.originalUrl,
            headers: extend({}, req.headers, {
                host: host
            })
        }).pipe(tr);
    });

}())