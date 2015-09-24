'use strict';

module.exports = function(grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt, {
    pattern: [ // '@*/grunt-*', 'assemble-less',
      'grunt-*'
    ]
  });

  // Define the configuration for all the tasks
  grunt.initConfig({
    // Project settings
    app: {
      public: 'public',
      bower: require('./.bowerrc').directory || 'bower_components'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      less: {
        files: ['<%= app.public %>/less/{,*/}*.less'],
        tasks: ['less:dev']
      }
    },

    // Compile less styles to app
    less: {
      dev: {
        files: {
          '<%= app.public %>/css/main.css': [
            '<%= app.public %>/less/main.less'
          ],
          '<%= app.public %>/css/admin.css': [
            '<%= app.public %>/less/admin.less'
          ]
        }
      },
      product: {
        options: {
          compress: true
        },
        files: {
          '<%= doc.static %>/styles/main.css': [
            '<%= doc.render %>/less/main.less'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= doc.static %>/scripts/scripts.min.js': [
            '<%= doc.static %>/scripts/scripts.js'
          ]
        }
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      js: {
        src: 'build.js',
        dest: 'public/js/main'
      }
    },

    shell: {
      options: {
        stderr: false
      },
      target: {
        command: 'jspm bundle-sfx js/main/index.js public/js/main/build.js'
      }
    },

    htmlbuild: {
      dist: {
        src: 'views/index.html',
        dest: 'views/build/',
        options: {
          beautify: true,
          // prefix: '//some-cdn',
          // relative: true,
          scripts: {
            build: '<%= app.public %>/js/main/build.*.js'
          },
        }
      }
    },
    clean: {
      first: ['<%= app.public %>/js/main/build.*.js'],
			last: ['<%= app.public %>/js/main/build.js']
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= doc.static %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= doc.static %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= doc.static %>/images',
          src: '{,*/}*.svg',
          dest: '<%= doc.static %>/images'
        }]
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server',
    function(target) {
      if (target === 'dist') {
        // return grunt.task.run(['build', 'connect:dist:keepalive']);
        return;
      }

      grunt.task.run([
        'watch'
      ]);
    });

  grunt.registerTask('build', 'Build product',
    function() {
      grunt.task.run([
        'clean:first',
        'shell:jspm',
        'filerev:js',
        'htmlbuild',
				'clean:last'
      ]);
    });

  grunt.registerTask('default', []);
};
