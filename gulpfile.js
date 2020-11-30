var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path = {
  src: './src/',
  dist: './build/',
};

var plugins = gulpLoadPlugins({
  pattern: ['gulp-*'],
  replaceString: /\bgulp[\-.]/,
});

gulp.task('js', function () {
  gulp.watch(path.src + 'js/*.js', ['js']);
  return gulp
    .src(path.src + 'js/*.js')
    .pipe(plugins.concat('index.js'))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(path.dist + 'js/'))
    .pipe(plugins.notify({ message: 'Scripts Task Finished!' }));
});

gulp.task('less', function () {
  gulp.watch(path.src + 'less/*.less', ['less']);
  return gulp
    .src(path.src + 'less/*.less')
    .pipe(plugins.less())
    .pipe(plugins.concatCss('index.css')) // name of concated css.
    .pipe(gulp.dest(path.dist + 'css/'))
    .pipe(plugins.notify({ message: 'CSS Task Finished!' }));
});

gulp.task('default', ['js', 'less']);
