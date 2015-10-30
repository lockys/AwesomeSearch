var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var path = {
    src: './build/',
    dist: './build/',
  };

var plugins = gulpLoadPlugins({
  pattern: ['gulp-*'],
  replaceString: /\bgulp[\-.]/,
});

gulp.task('js', function() {
  return gulp.src(path.src + '*.js')
    .pipe(plugins.concat('index.js'))
    .pipe(plugins.rename({ suffix: '.min' }))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(path.dist))
    .pipe(plugins.notify({ message: 'Scripts Task Finished!' }));
});

gulp.task('default', ['js']);
