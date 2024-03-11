var gulp = require('gulp')
, concat = require('gulp-concat')
, sass = require('gulp-sass')
, sourcemaps = require('gulp-sourcemaps')
, print = require('gulp-print')
, babel = require('gulp-babel');


var Cachebuster = require('gulp-cachebust')
var cachebust = new Cachebuster;

gulp.task('build-css', function () {
  return gulp.src('./styles/all.scss')//all are imported in tha one scss
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('bundle.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('build-js', [], function() {
   return gulp.src('views/**/*.js')//it will for all js files not matter how deep
      .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      //.pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/views'));
});

gulp.task('build', [ 'build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});
