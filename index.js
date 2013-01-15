module.exports = function (port, path) {
    "use strict";
    var http = require('http'),
        express = require('express'),
        app = express(),
        server = http.createServer(app);

    app.use(express.favicon(__dirname + '/favicon.ico'))
    app.use(express.static(path));
    app.use(express.directory(path));
    app.use(function (req, res) {
        res.send(418, 'No coffee.');
    });

    server.listen(parseInt(port), function () {
        var address = server.address();
        console.log('Serving ' + path + ' on port: ' + address.port);
    });
};
