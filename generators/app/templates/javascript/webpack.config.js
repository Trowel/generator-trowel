/*global __dirname, require, module*/

const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env  = require('yargs').argv.env; // use --env with webpack 2

let outputFile = '<%= props.names.kebabcase.plural %>.js';
let outputFileMin = '<%= props.names.kebabcase.plural %>.min.js';
let library = 'Trowel<%= props.names.pascalcase.plural %>';

const config = {
  entry: __dirname + '/<%= folders.src %>/javascript/<%= props.names.kebabcase.plural %>.js',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.json', '.js']
  }
};

var destConfig = Object.assign({}, config, {
  output: {
    path: __dirname + '/<%= folders.dest %>/javascript',
    filename: outputFile,
    library: library,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
});

var destMinConfig = Object.assign({}, config, {
  output: {
    path: __dirname + '/<%= folders.dest %>/javascript',
    filename: outputFileMin,
    library: library,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new UglifyJsPlugin({ minimize: true }),
  ],
});

var testConfig = Object.assign({}, config, {
  output: {
    path: __dirname + '/<%= folders.test %>/<%= folders.dest %>/javascript',
    filename: outputFile,
    library: library,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
});


module.exports = [destConfig, destMinConfig, testConfig];
