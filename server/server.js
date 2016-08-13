var express = require('express');
var bodyparser = require('body-parser');
var connection = require('./connection');
var routes = require('./routes');
var logger = require('morgan');

var app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(bodyparser.json());

app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.all('/*', [require('./middlewares/validateRequest')]); // Làm sao để tới đoạn này nó get access token rồi gắn zô header cho mình luôn rồi mới next()


connection.init();
routes.configure(app);

var server = app.listen(8000, function() {
    console.log('Server listening on port ' + server.address().port);
});