module.exports = function (port, path) {
    "use strict";
    var http = require('http'),
        connect = require('connect'),
        app = connect()
            .use(connect.favicon(__dirname + '/favicon.ico'))
            .use(connect.static(path))
            .use(connect.directory(path))
            .use(function (req, res) {
                res.send(418, 'No coffee.');
            }),

        server = http.createServer(app).listen(parseInt(port), function () {
            var address = server.address();
            console.log('Serving ' + path + ' on port: ' + address.port);
        });
};
