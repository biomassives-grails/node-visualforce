"use strict";

var conf = require('./tasks/lib/configuration.js').getConfiguration();

module.exports = function(grunt) {

  var staticResourceInputPath = conf.path.inputPath + conf.path.staticResourceFolder;
  var staticResourceOutputPath = conf.path.outputPath +  conf.path.staticResourceFolder + conf.path.staticResourceName;


  //Set Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    compress: {
      main: {
        options: {
          archive: staticResourceOutputPath + '.zip'
        },
        expand: true,
        cwd: staticResourceInputPath,
        src: ['**/*']
      }
    },
    watch: {
      scripts: {
        files: ['tasks/*.js','tasks/lib/*.js','Gruntfile.js'],
        tasks: ['jshint'],
        options: {
          spawn: false,
          event: ['added', 'changed']
        }
      }
    },
    jshint: {
      all: [
        "Gruntfile.js",
        "tasks/lib/*.js",
        "tasks/*.js"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    },
    antdeploy: {
        options: {
            // Task-specific options.
        },
        dev1: {
            options: {
                user:  'federico@sfadm.test',
                pass:  'force36206a',
                token: 'aHJVm2eWU4Ibhl8ndwkkd2wtN'
            },
            pkg: {
                staticresource: ['*'],
                apexpage: ['*']
            }
        }
    }
  });
 
  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Actually load this plugin"s task(s).
  grunt.loadTasks("tasks");
  // By default, lint and run all tests.
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("deploy", ["antdeploy"]);
  grunt.registerTask("build", ["build"]);
  
};