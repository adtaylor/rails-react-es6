/*global module:false*/
module.exports = function(grunt) {
  require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks)
  var webpack = require("webpack");
  var webpack_options = require('./webpack.config.js');

  // Project configuration.
  grunt.initConfig({

    webpack: {
      options: webpack_options,
      build: {
        plugins: webpack_options.plugins.concat(
          new webpack.DefinePlugin({
            "process.env": {
              // This has effect on the react lib size
              "NODE_ENV": JSON.stringify("production")
            }
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        )
      },
      "build-dev": {
        plugins: webpack_options.plugins.concat( new webpack.DefinePlugin({"process.env": { "NODE_ENV": JSON.stringify("development") } })),
        devtool: "sourcemap",
        debug: true
      }
    },
    
    watch: {
      scripts: {
        files: './**/*.js.coffee',
        tasks: ['exec:npm_test'],
      },

      webpack: {
        files: [
          "app/assets/javascripts/src/**/*", 
          "app/assets/javascripts/server_rendering/**/*", 
        ],
        tasks: ["webpack:build-dev"],
        options: {
          spawn: false,
        }
      }
    },

    exec: {
      npm_test: 'npm test'
    }

  });

  grunt.registerTask("default", ["webpack:build-dev", "watch:webpack"]);
  grunt.registerTask('build_js', ['webpack:build'])
};
