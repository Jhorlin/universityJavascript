/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function(){
    'use strict';

    var express = require('express'),
        env = require('node-env-file'),
        path = require('path'),
        httpProxy = require('http-proxy'),
        proxy = httpProxy.createProxyServer({}),
        harmon = require('harmon'),
        enrich = require('./lib/enrich'),
        enrichmentHandler = harmon([], [enrich]),
        app = express();

    env(path.join(__dirname, '.env'));

    var port = process.env.PORT,
        target = process.env.TARGET;

    app.listen(port, function(){
        console.log('listening on port %s', port);
    });

    app.use('/components', express.static(path.join(__dirname, 'components')));
    app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

    app.use(enrichmentHandler);

    app.use(function (req, res, next) {
        proxy.web(req, res, {target: target}, function(err){
            console.log(err.message);
        })
    });

}())