var gulp = require('gulp');
var jade = require('gulp-jade');
var clean = require('gulp-clean');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');


var paths = {  
  scripts: './app/js/jsx/*.jsx',
  views: './app/views/**/*.jade',
  styles: './app/styles/*.styl'
};

gulp.task('jade', function() {
  gulp.src(paths.views)
  .pipe(jade({
    pretty: true,
    basedir:'./app/views'
  }))
  .pipe(gulp.dest('./build'))
  .pipe(connect.reload());
  //Cleaning up
  // gulp.src('./build/layouts', {read: false})
  //   .pipe(clean());    
});

gulp.task('compress', function() {
  gulp.src('lib/*.js')
    .pipe(uglify({outSourceMap: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('stylus', function () {
  gulp.src('./app/styles/style.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});


gulp.task('clean', function() {
    gulp.src('app/tmp', {read: false})
      .pipe(clean());
});


gulp.task('serve', ['connect']);

gulp.task('connect', function(){ connect.server({
  root: ['./build'],
  livereload: true,
  open: {
    browser: 'chrome' 
  }
})
});

gulp.task('build', ['stylus', 'jade']);
gulp.task('default', ['serve', 'build', 'watch']);
gulp.task('reload', function(){
  connect.reload()
})

gulp.task('watch', function() {
  gulp.watch(paths.styles, ['stylus']);
  gulp.watch(paths.views, ['jade']);
});

