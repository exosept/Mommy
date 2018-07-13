var exports = module.exports = {};

const http = require('http');

exports.WSCALL = function (callback,inURL) {
    return http.get({
		hostname: 'ip',
		port: 3000,
        path: inURL 
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            callback(body);
        });
    
    }).on("error", function (err){
       callback('',err);
    });
    
}




