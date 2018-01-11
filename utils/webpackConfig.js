const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = (ReadefilePath, writeFilePath, writeFileName, isproduction) => {
  if (isproduction) {
    return {
      'entry': ReadefilePath,
      'output': {
        path: writeFilePath,
        filename: writeFileName
      },
      'module': {
        loaders: [
          {
            test: path.join(__dirname, 'es6'),
            loader: 'babel-loader',
            query: {
              presets: [
                "es2015",
                "stage-0"
              ]
            }
          }
        ]
      },
      'plugins': [
        new UglifyJsPlugin()
      ]
    }
  } else {
    return {
      'entry': ReadefilePath,
      'output': {
        path: writeFilePath,
        filename: writeFileName
      },
      'module': {
        loaders: [
          {
            test: path.join(__dirname, 'es6'),
            loader: 'babel-loader',
            query: {
              presets: [
                "es2015",
                "stage-0"
              ]
            }
          }
        ]
      }
    }
  }
}
