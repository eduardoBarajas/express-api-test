var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv');
var mongoose = require('mongoose');

var routes = require('./api/routes/index');
var nutrinetRoutes = require('./api/routes/NutriNet');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, './api/views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// env file reader init
dotenv.config();
var mongo_uri = `mongodb+srv://${process.env.DB_USER}:`+encodeURIComponent(process.env.DB_PASS)+process.env.DB;
mongoose.connect(mongo_uri, {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true});

app.use('/', routes);
app.use('/Api/NutriNet', nutrinetRoutes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const PORT = process.env.PORT || 8091;

app.listen(PORT, () => {
    console.log('Ejecutandose en el puerto '+PORT);
});

module.exports = app;
