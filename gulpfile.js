var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	webserver = require('gulp-webserver'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	autoprefix = require('gulp-autoprefixer'),
	notify = require('gulp-notify'),
	sass = require('gulp-sass');

gulp.task('webserver', function() {

	gulp.src('app')

		.pipe(webserver({

			livereload: true,

			directoryListing: false,

			open: true

	}));

});

gulp.task('js', function(){

	return gulp.src('app/js/app.js')

		.pipe(browserify())

		//.pipe(uglify())

		.pipe(rename('bundle.js'))

	  	.pipe(gulp.dest('app/js/'));

});

gulp.task('css', function(){

	return gulp.src('app/scss/layout.scss')

		.pipe(notify())

		.pipe(sass({outputStyle: 'compressed'}))

		.pipe(autoprefix('last 15 versions'))

	  	.pipe(gulp.dest('app/css'));

});


gulp.task('default', function() {

	gulp.run('webserver');

	gulp.run('js');

    gulp.run('css');

    gulp.watch('app/scss/*.scss', function(){

    	gulp.run('css');

    });

    gulp.watch('app/js/**/*.js', function(){

    	gulp.run('js');

    });


});