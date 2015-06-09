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
        app = express();

    env(path.join(__dirname, '.env'));

    var port = process.env.PORT,
        target = process.env.TARGET;

    app.listen(port, function(){
        console.log('listening on port %s', port);
    });

    app.use(function(req, res, next){
        proxy.web(req, res, {target: target}, function(err){
            console.log(err.message);
        })
    });


}())