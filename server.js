var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors());
app.locals.root_path = __dirname;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

require('./server/config/routes')(app);

var port = 3000;

app.listen(port,function() {
	console.log('http://localhost:'+port);
});