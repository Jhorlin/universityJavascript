/**
 * Created by jhorlin.dearmas on 6/8/2015.
 */
(function(module){
    var through2 = require('through2'),
        fs = require('fs'),
        path = require('path'),
        noop = function(chunk, enc, cb){
            cb(null, chunk);
        };
    module.exports = {
        query:'head',
        func:function(node){
            var stream = node.createStream();
            stream.pipe(through2(noop, function(cb){
                var self = this;
                fs.readFile(path.join(__dirname, '../components/heatmap/index.html'), function(err, data){
                    self.push(data.toString());
                    cb();
                });
            })).pipe(stream);
        }
    }
}(module))