var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var config = require('./webpack.config');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var buildPath = path.join(__dirname, 'app/src/client/public');

config.output.path = buildPath;
config.output.publicPath = buildPath;
config.plugins = [
      new BrowserSyncPlugin({
          host: 'localhost',
          port: 3100,
          proxy: 'http://localhost:3000/'
        },
        {
          reload: true
        }
      ),
      new ExtractTextPlugin("styles.css", {allChunks: true}),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('development')
        }
      })
];

process.env.NODE_ENV = 'development';

module.exports = config;
