'use strict';

var gulp = require('gulp'),
	browserify = require('gulp-browserify'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	sass = require('gulp-sass'),
    livereload = require('gulp-livereload');
 
gulp.task('js', function() {
	gulp.src('./assets/js/dev/**/*.js')
	    .pipe(uglify({mangle: false}))
	    .pipe(gulp.dest('./assets/js/prod'))
    	.pipe(livereload()).on('ready', function(watcher) {
		    console.log('js ready.')
		});
});

gulp.task('sass', function () {
	gulp.src('./assets/sass/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'compressed'}))
  		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/css'))
		.pipe(sourcemaps.init())
    	.pipe(livereload())
    	.on('ready', function(watcher) {
		    console.log('css ready.')
		});
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	livereload.listen();
	gulp.watch('./assets/js/dev/**/*.js', ['js']).on('ready', function(watcher) {
	    console.log('ready')
	});
	gulp.watch('./assets/js/dev/**/*.scss', ['sass']).on('ready', function(watcher) {
	    console.log('ready')
	});
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch','js','sass']);