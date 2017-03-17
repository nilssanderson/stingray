
// =============================================================================
// Include plugins
// =============================================================================

var $                 = require('gulp-load-plugins')();
var gulp              = require('gulp');
var gutil             = require('gulp-util');
var sass              = require('gulp-sass');
var concat            = require('gulp-concat');
var notify            = require('gulp-notify');
var cssnano           = require('gulp-cssnano');
var imagemin          = require('gulp-imagemin');
var sourcemaps        = require('gulp-sourcemaps');
var autoprefixer      = require('gulp-autoprefixer');
var rimraf            = require('rimraf');
var sassdoc           = require('sassdoc');
var sassdoc           = require('require-dir');
var browser           = require('browser-sync');
var sequence          = require('run-sequence');





// =============================================================================
// Use `spawn` to execute shell command using Node
// The directory that contains the Gulpfile whose task needs to be run.
// Gulp tasks that need to be run.
// Check for --production flag
// Port to use for the development server.
// Browsers to target when prefixing CSS.
// =============================================================================

var PORT              = 3010;
var UI_PORT           = 3020;
var COMPATIBILITY     = ['last 2 versions', 'ie >= 9'];





// =============================================================================
// Paths
// =============================================================================

var srcPath           = 'app';
var buildPath         = 'build';





// =============================================================================
// Delete the buildPath folder
// This happens every time a build starts
// =============================================================================

gulp.task('clean', function(done) {
    rimraf(buildPath, done);
});





// =============================================================================
// Copy HTML
// =============================================================================

gulp.task('html', function() {
  gulp.src(srcPath + '/*.html')
    .pipe(gulp.dest(buildPath));
});





// =============================================================================
// Compile Sass into CSS
// In production, the CSS is compressed
// =============================================================================

gulp.task('sass', function() {
    return gulp
        .src(srcPath + '/sass/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', notify.onError(function (error) {
            return "Problem file : " + error.message;
        }))
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildPath + '/css'));
});





// =============================================================================
// Combine JavaScript into one file
// In production, the file is minified
// =============================================================================

gulp.task('javascript', function() {
    return gulp
        .src(srcPath + '/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(buildPath + '/js'));
});





// =============================================================================
// Copy src fonts to the buildPath folder
// =============================================================================

gulp.task('fonts', function() {
    return gulp
        .src(srcPath + '/fonts/**/*')
        .pipe(gulp.dest(buildPath + '/fonts'));
});





// =============================================================================
// Build the buildPath folder by running all of the above tasks
// =============================================================================

gulp.task('build', function(done) {
    sequence('clean', [
        'sass',
        'fonts',
        'javascript',
        'html'
    ], done);
});





// =============================================================================
// Start a server with LiveReload to preview the site in
// =============================================================================

gulp.task('server', ['build'], function() {
    browser.init({
        server: buildPath,
        port: PORT,
        ui: {
            port: UI_PORT
        }
    });
});





// =============================================================================
// Build the site, run the server, and watch for file changes
// =============================================================================

gulp.task('default', ['build', 'server'], function() {
    gulp.watch([srcPath + '/*.html'], ['html', browser.reload]);
    gulp.watch([srcPath + '/sass/**/*.scss'], ['sass', browser.reload]);
    gulp.watch([srcPath + '/fonts/**/*.fonts'], ['fonts', browser.reload]);
    gulp.watch([srcPath + '/js/**/*.js'], ['javascript', browser.reload]);
});