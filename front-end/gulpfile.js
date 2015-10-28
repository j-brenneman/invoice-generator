var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

var path = {
  HTML: 'src/index.html',
  SASS: ['src/sass/app/main.scss', 'src/sass/app/_colors.scss', 'src/sass/app/_sidebar.scss', 'src/sass/app/_navbar.scss',
         'src/sass/app/_newjob.scss', 'src/sass/app/_controlbar.scss', 'src/sass/app/_jobs.scss', 'src/sass/app/_neWorkentry.scss',
         'src/sass/app/_invoice.scss', 'src/sass/app/_workentries.scss', 'src/sass/app/_workhistory.scss'],
  MINIFIED_OUT: 'build.min.js',
  OUT: 'build.js',
  DEST: '../server/views',
  DEST_BUILD: '../server/public/javascripts/build',
  DEST_SRC: '../server/public/javascripts/src',
  DEST_CSS: '../server/public/css',
  ENTRY_POINT: './src/js/components/app.jsx'
};

gulp.task('copy', function () {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function () {
  gulp.watch(path.HTML, ['copy']);
  gulp.watch(path.SASS, ['sass']);

  var watcher = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_SRC))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('sass', function () {
  gulp.src(path.SASS)
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(path.DEST_CSS))
})

gulp.task('default', ['copy', 'sass', 'watch']);

// Production
gulp.task('build', function () {
  browserify({
    entries: [path.ENTRY_POINT],
    transform: [reactify]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function () {
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': '/javascripts/build/' + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('production', ['replaceHTML', 'build', 'sass']);
