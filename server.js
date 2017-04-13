// var express = require('express');
// var app = express();

var app = require('./express');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public editor to host static content
app.use(app.express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var customServer = require ("./assignment/app.js");
customServer(app);

require("./project/app.js")(app);

// require("./lectures/mongo/movies.js")(app);
// require("./lectures/passportjs/services/user.service.server");

var port = process.env.PORT || 3000;

app.listen(port);