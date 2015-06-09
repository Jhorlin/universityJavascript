/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function () {
    'use strict';

    var express = require('express'),
        env = require('node-env-file'),
        path = require('path'),
        fs = require('fs'),
        app = express();

    env(path.join(__dirname, '.env'));

    var port = process.env.PORT;

    app.listen(port, function () {
        console.log('listening on port %s', port);
    });

    app.use('/components', express.static(path.join(__dirname, 'components')));
    app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

    app.get('/:view', function(req, res, next){
        res.setHeader('content-type', 'text/html');
        var stream = fs.createReadStream(path.join(__dirname, 'views/' + req.params.view + '.html'));
         stream.on('error', function(){
                next();
            });
        stream.pipe(res);
    });

}())