var webpack = require("webpack");
var path = require('path');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : SRC_DIR,
        loader : 'babel-loader',      
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [new webpack.DefinePlugin({
    'SERVER': JSON.stringify(process.env.SERVER) || JSON.stringify('https://heroku-github-fetcher.herokuapp.com'),
    'PORT' : JSON.stringify(process.env.PORT) || JSON.stringify('80')
  })],
};