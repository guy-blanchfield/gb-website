const gulp = require('gulp'); 
// explicitly use dart sass version of gulp-sass
// by requiring 'sass' as well as 'gulp-sass'
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
    // get sass files
    return gulp.src('./scss/**/*.scss')
    // pass sass files through sass compiler
    .pipe(sass().on('error', sass.logError))
    // save the to the css folder
    .pipe(gulp.dest('./css'))
    // stream changes to browser
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
           baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style)
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;
