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

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					flatten: true,
					cwd: '<%= doc.bower %>',
					dest: '<%= doc.static %>/scripts/vendor',
					src: [
						'jquery/dist/jquery.js',
						'bootstrap/dist/js/bootstrap.js'
					]
				}, {
					expand: true,
					flatten: true,
					cwd: '<%= doc.bower %>',
					dest: '<%= doc.static %>/fonts/vendor',
					src: ['ionicons/fonts/*', 'font-awesome/fonts/fontawesome-*']
				}]
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

		concat: {
			dist: {
				src: [
					'<%= doc.static %>/scripts/vendor/jquery.js',
					'<%= doc.static %>/scripts/vendor/bootstrap.js',
					'<%= doc.render %>/js/functions.js',
					'<%= doc.render %>/js/script.js',
					'<%= doc.render %>/js/materialoe/*.js'
				],
				dest: '<%= doc.static %>/scripts/scripts.js'
			}
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

	grunt.registerTask('init', 'Prepare project for development',
		function() {
			grunt.task.run([
				'less:dev',
				'copy'
			]);
		});

	grunt.registerTask('build', 'Build product',
		function() {
			grunt.task.run([
				'less:product',
				'copy',
				'concat',
				'uglify',
				'imagemin',
				'svgmin'
			]);
		});

	grunt.registerTask('default', []);
};
