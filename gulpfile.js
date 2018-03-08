'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
 
gulp.task('sass', function () {
  return gulp.src('./app/public/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/public/css'));
});

gulp.task('musical', function () {
  return gulp.src('./app/public/sass/musical.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/public/css'));
});

gulp.task('ui', function () {
  return gulp.src('./app/public/sass/ui.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/public/css/output/ui'));
});

gulp.task('js', function () {
  return gulp.src('./app/public/js/order.js')
		 .pipe(babel({
            presets: ['es2015']
         }))
         .pipe(browserify({transform:'babelify'}))
         .pipe(gulp.dest('./app/public/build/js'));
});