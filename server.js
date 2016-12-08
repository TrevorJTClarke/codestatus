var express =       require('express')
    , bodyParser =  require('body-parser')
    , http =        require('http')
    , path =        require('path')
    , fs =          require("fs");

var app = express();
var pjson = JSON.parse(fs.readFileSync('./package.json'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/dist/'));

app.all('/*', function(req, res){
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.set('port', process.env.PORT || 2345);
http.createServer(app).listen(app.get('port'), function(){
  console.log("~~~~~~~~~~~~~~~~~~~~~\n~~~~  Code Status  ~~~~\n~~~~~~~~~~~~~~~~~~~~~");
  console.log("http://localhost:" + app.get('port'));
  console.log("VER:", pjson.version);
});
