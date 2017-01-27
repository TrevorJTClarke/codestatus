var express =       require('express')
    , bodyParser =  require('body-parser')
    , http =        require('http')
    , path =        require('path')
    , fs =          require("fs")
    , pkg = require('./package.json')
    , Headers = require('./server/headers')
    , Body = require('./server/body')
    , config = require('./config/serverConfig.json')
    , firebase = require('firebase')
    ;

var app = express()
var fb = firebase.initializeApp(config.firebase)
var database = fb.database()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/dist/'));

// Im lazy:
var errors = {
  0: 'Invalid Authentication',
  1: 'Invalid Headers',
  2: 'Invalid Parameters',
  3: 'Invalid Body',
  4: 'Missing Fields',
  5: 'Request Failed'
}

// Returns health data only
app.get('/health', (req, res) => {
  // Health Check
  res.json({ status: '😎' });
})

// The endpoint for all updates
app.post('/:project/:env', (req, res) => {
  var validHeaders = Headers.isValid(req.headers)
  var validBody = Body.isValid(req.body)
  var formatted = Body.format(req.body)

  // verify if it has required headers
  if (!validHeaders) {
    res.json({ status: 401, error: errors[1] });
    return;
  }

  // body validation
  if (!validBody) {
    res.json({ status: 403, error: errors[3] });
    return;
  }

  // Test for valid params
  if (!req.headers['x-codestatus-key'] || !req.params.project || req.params.project.length < 3 || !req.params.env || req.params.env.length < 1) {
    res.json({ status: 403, error: errors[2] });
    return;
  }

  // final url
  var url = `${req.headers['x-codestatus-key']}/projects/${req.params.project}/${req.params.env}`

  database.ref(url).set(formatted)
    .then(() => {
      res.json({ status: '😎', data: formatted, timestamp: (+new Date()) })
    }, (err) => {
      res.json({ status: 501, error: errors[5], reason: err })
    })
})

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})


app.set('port', process.env.PORT || 2345);
http.createServer(app).listen(app.get('port'), function(){
  console.log("Code Status");
  console.log("http://localhost:" + app.get('port'));
  console.log("VER:", pkg.version);
});
