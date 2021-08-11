var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var del = require('del');

var paths = require('./paths');

var assign = Object.assign || require('object.assign');

// subtasks for war file deployment

gulp.task('clean-war', function() {
	return del(paths.war + '/*', {force: true});
});

gulp.task('copy-to-war', function() {
	return gulp.src(paths.files_to_copy).pipe(gulp.dest(paths.war));
});

// primary build task for war file deployment

gulp.task('war', 
    gulp.series('clean-war', 'copy-to-war')
); 

// copy directly to web server

gulp.task('web', function() {
	return gulp.src(paths.files_to_copy).pipe(gulp.dest(paths.web));
});

