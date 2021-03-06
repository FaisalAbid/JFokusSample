var express = require('express');
var fs = require("fs");
var app = express();
var server = require('http').createServer(app);
var db = require("./database/db").setup();
var controllerFiles = fs.readdirSync('controllers');

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.logger('dev'));
    app.use(express.methodOverride());
    app.use(allowCrossDomain);
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler());
});


controllerFiles.forEach(function (controllerFile) {
    if (controllerFile.indexOf('.js') === -1) {
        return;
    } else {
        controllerFile = controllerFile.replace('.js', '');
        var controller = require('./controllers/' + controllerFile);
        controller.setup(app);
    }
});

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});