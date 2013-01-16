module.exports = function (port, path) {
    "use strict";
    var http = require('http'),
        connect = require('connect'),
        app = connect(),
        server = http.createServer(app);

    app.use(connect.favicon(__dirname + '/favicon.ico'));
    app.use(connect.static(path));
    app.use(connect.directory(path));
    app.use(function (req, res) {
        res.send(418, 'No coffee.');
    });

    server.listen(parseInt(port), function () {
        var address = server.address();
        console.log('Serving ' + path + ' on port: ' + address.port);
    });
};
