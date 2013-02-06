module.exports = function (ssl, port, path, auth, log, nodirlists) {
    "use strict";
    var connect = require('connect'),
        app = connect(),
        fs = require('fs'),
        usr, server, options, secure, key, cert;
    
    function emitNextTick(ev, msg) {
        process.nextTick(function () {
            server.emit(ev, msg);
        });
    }

    function throwErr(err) {
        console.log(err);
        process.exit();
    }

    if (ssl) {
        secure = ssl.split(',');
        key = (fs.existsSync(secure[0]) && fs.statSync(secure[0]).isFile()) ? secure[0] : null;
        cert = (fs.existsSync(secure[1]) && fs.statSync(secure[1]).isFile()) ? secure[1] : null;
        console.log(key + ' ' + cert);
        if (key && cert) {
            options = {
                key: fs.readFileSync(key),
                cert: fs.readFileSync(cert)
            };
            server = require('https').createServer(options, app).listen(port);
            emitNextTick('secure');
        } else {
            throwErr('Error: Could not read cert or key file.');
        }
    } else {
        server = require('http').createServer(app).listen(port);
    }

    // we need to wait for one tick before emitting events, so that the server is actually returned first
    if (auth) {
        usr = auth.split(':');
        app.use(connect.basicAuth(usr[0], usr[1]));
        emitNextTick('authed');
    }
    
    if (log) {
        if (['default', 'short', 'tiny', 'dev'].indexOf(log) > -1) {
            app.use(connect.logger(log));
            emitNextTick('logging');
        } else {
            throwErr('Error: Unknown logging level');
        }
    }

    // static middleware handles reqs (also for favicons)first, the favicon-middleware is a fallback
     app.use(connect.static(path))
        .use(connect.favicon(__dirname + '/favicon.ico'));
    
    // the directorylistings are created unless explicitly disabled
    if (!nodirlists) {
        app.use(connect.directory(path));
    } else {
        emitNextTick('nodirlists');
    }
    
    // a fallback response for everything that falls through
    app.use(function (req, res) {
        res.writeHead(418, {'Content-Type': 'text/html'});
        res.end('<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <title>http-share</title>\n  </head>\n    <body>\n    <h1 style="font-size:1100%;color:#696969;position:fixed;bottom:0;left:0;padding:0;margin:0">☕<i style="font:italic 42% Georgia, Times, serif;">On a coffeebreak...</i></h1>\n  </body>\n</html>\n');
    });

    return server;
};
