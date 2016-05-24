var gulp        = require('gulp');
var minify      = require('gulp-cssmin');
var duration    = require('gulp-duration');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);

// Task configuration
gulp.task('minify', function() {
  gulp.src('assets/css/*.css')
  // Minify the stylesheet
  .pipe(minify())
  // Report the task-execution time in the command line
  .pipe(duration('Execution Time: '))
  // Write the minified file in the css directory
  .pipe(gulp.dest('_site/assets/css/'));

  gulp.src('assets/js/*.js')
  // Minify the stylesheet
  .pipe(uglify())
  // Report the task-execution time in the command line
  .pipe(duration('Execution Time: '))
  // Write the minified file in the css directory
  .pipe(gulp.dest('_site/assets/js/'));
});
// Use `gulp` command to run the task
