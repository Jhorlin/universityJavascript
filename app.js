/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function () {
    'use strict';

    var express = require('express'),
        env = require('node-env-file'),
        path = require('path'),
        fs = require('fs'),
        app = express(),
        server = require('http').Server(app),
        io = require('socket.io')(server);


    env(path.join(__dirname, '.env'));

    var port = process.env.PORT;

    server.listen(port, function () {
        console.log('listening on port %s', port);
    });

    app.use('/components', express.static(path.join(__dirname, 'components')));
    app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

    app.get('/:view', function (req, res, next) {
        res.setHeader('content-type', 'text/html');
        var stream = fs.createReadStream(path.join(__dirname, 'views/' + req.params.view + '.html'));
        stream.on('error', function () {
            next();
        });
        stream.pipe(res);
    });


    var paths = [];

    io.on('connection', function (socket) {
        socket.emit('paths', paths);
        socket.on('path', function (path, fn) {
            var index = paths.length;
            paths.push(path);
            io.emit('path', {
                index: index,
                path: path
            });
            fn(index);
        })
        socket.on('point', function (pointPayload) {
            var index = paths[pointPayload.index].points.length;
                paths[pointPayload.index].points.push(pointPayload.point);
            io.emit('point', {
                point:pointPayload.point,
                pointIndex:index,
                pathIndex:pointPayload.index
            });
        })
    })

}())