/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function(){
    'use strict';

    var express = require('express'),
        env = requrie('node-env-file'),
        path = require('path'),
        app = express();

    env(path.join(__dirname, '.env'));

    var port = process.env.PORT;

    app.listen(port, function(){
        console.log('listening on port %s', port);
    })


}())