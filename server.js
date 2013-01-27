module.exports = function (port, path, auth, log, nodirlists) {
    "use strict";
    var http = require('http'),
        connect = require('connect'),
        app = connect(),
        server = http.createServer(app).listen(port),
        usr;

    // we need to wait for one tick before emitting events, so that the server is actually returned first
    if (auth) {
        usr = auth.split(':');
        app.use(connect.basicAuth(usr[0], usr[1]));
        process.nextTick(function () {
            server.emit('authed');
        });
    }
    
    if (log) {
        app.use(connect.logger(log));
        process.nextTick(function () {
            server.emit('logging');
        });
    }

    // static middleware handles reqs for favicons first, the favicon-middleware is a fallback
     app.use(connect.static(path))
        .use(connect.favicon(__dirname + '/favicon.ico'));
    
    // the directorylistings are created unless explicitly disabled
    if (!nodirlists) {
        app.use(connect.directory(path));
    } else {
        process.nextTick(function () {
            server.emit('nodirlists');
        });
    }
    
    // a fallback response for everything that falls through
    app.use(function (req, res) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.end('<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>http-share</title>\n  </head>\n    <body>\n    <h1 style="font-size:1100%;color:#696969;position:fixed;bottom:0;left:0;padding:0;margin:0">☕<i style="font:italic 42% Georgia, Times, serif;">On a coffeebreak...</i></h1>\n  </body>\n</html>\n');
    });

    return server;
};
