var gulp = require('gulp'),
	sass = require('gulp-sass'),
	rename = require('gulp-rename'),
	opn = require('opn'),
	nodemon = require('gulp-nodemon'),
	browserSync = require('browser-sync');


var BROWSER_SYNC_RELOAD_DELAY = 250;

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
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync({
	proxy: 'http://localhost:3000',
	port: 4000,
	browser: ['google-chrome']
  });
});

gulp.task('sass', function () {
  gulp.src('./static/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({extname: ".css"}))
    .pipe(gulp.dest('./static/css'))
    .pipe(browserSync.reload({ stream: true }));
});

var openBrowser = false;
gulp.task('openbrowser', function() {
	if(!openBrowser){
	  opn('http://localhost:4000');
	  openBrowser = true	
	}
});

gulp.task('default', ['sass','browser-sync','openbrowser'], function () {
  gulp.watch('./static/sass/**/*.scss', ['sass']);
  gulp.watch('static/**/*.js',   [browserSync.reload]);
  gulp.watch('static/**/*.css',  [browserSync.reload]);
  gulp.watch('templates/**/*.html', [browserSync.reload]);
});