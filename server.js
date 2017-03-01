var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// configure a public editor to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var customServer = require ("./assignment/app.js");
customServer(app);

require("./lectures/mongo/movies.js")(app);

var port = process.env.PORT || 3000;

app.listen(port);