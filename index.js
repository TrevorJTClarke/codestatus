var express =       require('express')
    , bodyParser =  require('body-parser')
    , http =        require('http')
    , path =        require('path')
    , fs =          require("fs")
    , pkg = require('./package.json')
    , config = require('./config/serverConfig.json')
    , firebase = require('firebase')
    ;

var app = express()
var fb = firebase.initializeApp(config.firebase)
var database = fb.database()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/health', (req, res) => {
  // Health Check
  res.send('Ok');
})

app.post('/:project/:env', (req, res) => {
  // verify if it has required headers
  if (!req.headers || !req.headers['x-codestatus-key']) return;
  // console.log('x-codestatus-key', req.headers['x-codestatus-key'])
  // console.log('req.headers', req.headers);
  // console.log('req.params', req.params);
  // console.log('req.body', req.body);

  database.ref(`${req.headers['x-codestatus-key']}/projects/${req.params.project}/${req.params.env}`).set(req.body)
  res.end();
})


app.set('port', process.env.PORT || 2345);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Code Status");
  console.log("http://localhost:" + app.get('port'));
  console.log("VER:", pkg.version);
});
