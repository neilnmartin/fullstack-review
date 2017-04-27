var express = require('express');
var bodyParser = require('body-parser');
//var http = require('http');
var promise = require('bluebird'); 
var request = require('request-promise');
var Repo = require('../database');

var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.json());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  // TODO

  // Receive the username via POST request
  console.log(req.body.username);

  // Retrieve the repos for this username from github via get request
  var options = {
      uri: `https://api.github.com/users/${req.body.username}/repos`,
      qs: { access_token:'4c5a71f6a10d0e01e73f6825801bb5093c694781' },
      headers: {
          'User-Agent': 'Request-Promise'
      },
      json: true // Automatically parse the JSON string in the response
    };

  request(options)
      .then(function (repos) {
          // Add retrieved repos to DB
          console.log('User has %d repos', repos.length);
          if(repos.length > 0){
            for(var repo of repos){
              var newRepo = new Repo({
                repo_id: repo.id, 
                repo_owner: repo.owner.login,
                repo_name: repo.name,
                repo_url: repo.html_url,
                repo_star_count: repo.stargazers_count
              })
              console.log('Saving repo to DB: ', newRepo.repo_name);
              newRepo.save()
              .then(function (repo) {
                console.log('Saved repo to DB successfully: ', repo.repo_name);
                res.status(201).send();
              })
              .catch(function(err){
                console.log('DB save error: ', err);
                res.status(303).send();
              });
            }
          }
      })
      .catch(function (err) {
          console.log('Github API fetch error: ', err);
          res.status(400).send();
      });
});

app.get('/repos', function (req, res) {
  Repo.find().sort({repo_star_count: -1}).limit(25).exec()
  .then(function(repos){
    console.log('Retrieved repos successfully from DB: ', repos);
    res.status(200).send(repos);
  })
  .catch(function(err){
    console.log('Repo DB retrieve error: ', err);
  });
});

app.get('/env.js', function(req, res){
    res.send(`
      var SERVER="${process.env.SERVER}",
      var PORT="${process.env.PORT}",
      `);
});

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

