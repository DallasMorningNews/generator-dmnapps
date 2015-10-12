var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  nodemon = require('gulp-nodemon'),
  sass = require('gulp-sass'),
  rename = require('gulp-rename');


gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: 'app.js',
    watch: ['app.js']
  })
    .on('start', function onStart() {
      if (!called) { cb(); }
      called = true;
    })
    .on('restart', function onRestart() {
      //small reload delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, 500);
    });
});

gulp.task('sass', function () {
  gulp.src('./static/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({extname: ".css"}))
    .pipe(gulp.dest('./static/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 4000,
    browser: ['google-chrome']
  });
});


gulp.task('bs-reload', function () {
  browserSync.reload();
});


gulp.task('default', ['sass','browser-sync'], function () {
  gulp.watch('static/sass/**/*.scss', ['sass','bs-reload']);
  gulp.watch('static/**/*.js',   ['bs-reload']);
  gulp.watch('static/**/*.css',  ['bs-reload']);
  gulp.watch('templates/**/*.html', ['bs-reload']);
});