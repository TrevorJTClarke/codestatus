var express =       require('express')
    , bodyParser =  require('body-parser')
    , http =        require('http')
    , path =        require('path')
    , fs =          require("fs")
    , pkg = require('./package.json')
    , config = require('./config/serverConfig.json')
    , passport = require('passport')
    , firebase = require('firebase')
    ;

var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(express.static(__dirname + '/dist/'));

// app.all('/*', function(req, res){
//   res.sendFile(path.join(__dirname, '/dist/index.html'));
// });

var fb = firebase.initializeApp(config.firebase)
var database = fb.database()
var GitHubStrategy = require('passport-github').Strategy

passport.use(new GitHubStrategy({
    clientID: (config && config.Github && config.Github.ClientId) ? config.Github.ClientId : process.env.GITHUB_CLIENT_ID,
    clientSecret: (config && config.Github && config.Github.ClientSecret) ? config.Github.ClientSecret : process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:2345/auth/github/callback"
    // callbackURL: "https://codestatus-c51cb.firebaseapp.com/__/auth/handler"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log('accessToken, refreshToken, ', accessToken, refreshToken)
    console.log('GITHUB:', profile._json)
    database.ref('users/' + profile.id).set({
      id: profile.id,
      fullName: profile.displayName,
      userName: profile.username,
      type: profile.provider
    })
    return cb(null, profile)
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

app.get('/auth/github', passport.authenticate('github'))

app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login'
  }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  })

app.set('port', process.env.PORT || 2345);
http.createServer(app).listen(app.get('port'), function(){
  console.log("~~~~~~~~~~~~~~~~~~~~~\n~~~~  Code Status  ~~~~\n~~~~~~~~~~~~~~~~~~~~~");
  console.log("http://localhost:" + app.get('port'));
  console.log("VER:", pkg.version);
});
