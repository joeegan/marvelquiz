var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', function() {
   gulp.src([
         'src/lib/jquery-1.11.0.min.js',
         'src/lib/typeahead.bundle.js',
         'src/lib/underscore.js',
         'src/namespace.js',
         'src/urls.js',
         'src/client.js',
         'src/wallpaper.js',
         'src/autocomplete.js',
         'src/app.js'
         ])
      .pipe(uglify())
      .pipe(concat("app.js"))
      .pipe(gulp.dest('dist'));
});
