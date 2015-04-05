var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
  var files = [];
  srcpath = __dirname + srcpath;
  fs.readdirSync(srcpath).forEach(function(file) {
    var filePath = path.join(srcpath, file);
    if( fs.statSync( filePath ).isDirectory()) files.push(filePath);
  });
  return files;
}


// var yaks_global_plugins = getDirectories('/app/assets/javascripts/yaks_plugins/global');
// var yaks_offers_plugins = getDirectories('/app/assets/javascripts/yaks_plugins/offers');

module.exports = {
  entry: {
    app: [ 
      './app/assets/javascripts/src/index.js',
      './app/assets/javascripts/src/init_rendered.js'
    ],

    react_server: [
      './app/assets/javascripts/server_rendering/server_components.js'
    ]
  },

  plugins: [],

  output: {
    filename: "app/assets/javascripts/build_[name].js",
  },

  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  }
}
