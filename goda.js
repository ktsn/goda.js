/**
 * Created with IntelliJ IDEA.
 * User: katashin
 * Date: 12/4/14
 */

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var io = require('socket.io');
var config = require('./config');

var docRoute = require('./routes/docs');

var app = express();

app.use(express.static(__dirname + '/web'));
app.use(bodyParser.json());
app.use(multer({ dest: config.file.dest }));

app.route('/docs/:id')
  .get(docRoute.getDoc);
app.listen(config.port);
