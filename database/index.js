var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

var repoSchema = mongoose.Schema({
  // TODO: your schema here!

  /******** SCHEMA *********

    ID (unique) | REPO_OWNER | REPO_NAME | URL | WATCHERS_COUNT
  
  *************************/

  repo_id: {type: Number, index: {unique: true, dropDups: true} },
  repo_owner: String,
  repo_name: String,
  repo_url: String,
  repo_star_count: Number

});

var Repo = mongoose.model('Repo', repoSchema);

repoSchema.index({repo_id: 1}, {uniqe: true});


module.exports = Repo;