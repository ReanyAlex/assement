var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var uglify = require('gulp-uglify');
var pump = require('pump');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();

gulp.task('css', function() {
  return gulp
    .src('app/styles/*.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .on('error', function(error) {
      console.log(error.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('docs/styles'));
});

gulp.task('scripts', function(cb) {
  pump([gulp.src('app/scripts/*.js'), uglify(), gulp.dest('docs/scripts')], cb);
});

gulp.task('copyAssetsFile', function() {
  return gulp.src('app/assets/**/*').pipe(gulp.dest('./docs/assets'));
});

gulp.task('copyHtml', function() {
  return gulp.src('app/index.html').pipe(gulp.dest('./docs'));
});

gulp.task('build', ['css', 'scripts', 'copyAssetsFile', 'copyHtml']);

// ----------

gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'docs'
    }
  });

  watch('./app/index.html', function() {
    gulp.start('domRefresh');
  });

  watch('./app/styles/**/*.scss', function() {
    gulp.start('cssInject');
  });

  watch('./app/scripts/**/*.js', function() {
    gulp.start('scriptRefresh');
  });
});

gulp.task('cssInject', ['css'], function() {
  browserSync.reload();
});

gulp.task('scriptRefresh', ['scripts'], function() {
  browserSync.reload();
});

gulp.task('domRefresh', ['copyHtml'], function() {
  browserSync.reload();
});
