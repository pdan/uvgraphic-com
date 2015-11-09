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
      public: 'public'
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
          '<%= app.public %>/css/build.css': [
            '<%= app.public %>/packages/github/OwlFonk/OwlCarousel@1.3.2/owl-carousel/owl.carousel.css',
            '<%= app.public %>/packages/github/OwlFonk/OwlCarousel@1.3.2/owl-carousel/owl.theme.css',
            '<%= app.public %>/less/main.less'
          ],
          '<%= app.public %>/css/admin.css': [
            '<%= app.public %>/less/admin.less'
          ]
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '<%= app.public %>/js/main/build.min.js': [
            '<%= app.public %>/js/main/build.js'
          ]
        }
      }
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 8
      },
      buildJS: {
        src: '<%= app.public %>/js/main/build.min.js'
      }
    },

    shell: {
      options: {
        stderr: false
      },
      jspm: {
        command: 'jspm bundle-sfx js/main/index.js <%= app.public %>/js/main/build.js'
      }
    },

    htmlbuild: {
      dist: {
        src: 'views/index.html',
        dest: 'views/build',
        options: {
          beautify: true,
          prefix: '/js',
          relative: false,
          scripts: {
            buildJS: {
							cwd: '<%= app.public %>/',
							files: 'js/main/build.*.js'
						}
          },
          styles: {
            buildCSS: {
							cwd: '<%= app.public %>/',
							files: 'css/build.css'
						}
          },
        }
      }
    },

    clean: {
      first: ['<%= app.public %>/js/main/build.*js*'],
      last: [
        '<%= app.public %>/js/main/build.js',
        '<%= app.public %>/js/main/build.min.js'
      ]
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '/images',
          src: '{,*/}*.svg',
          dest: '/images'
        }]
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server',
    function(target) {
      if (target === 'dist') {
        return grunt.task.run(['build']);
      }

      grunt.task.run([
        'watch'
      ]);
    });

  grunt.registerTask('build', 'Build product',
    function() {
      grunt.task.run([
				'less:product',
        'clean:first',
        'shell:jspm',
        'uglify',
        'filerev:buildJS',
        'htmlbuild',
        'clean:last'
      ]);
    });

  grunt.registerTask('default', []);
};
