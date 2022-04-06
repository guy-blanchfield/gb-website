const gulp = require('gulp'); 
// explicitly use dart sass version of gulp-sass
// by requiring 'sass' as well as 'gulp-sass'
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');


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


// autoprefix the css
// could be part of a build function, 
// or could be integrated into the style function i.e. autoprefix the css that comes out of sass()
// but leave as is for now and run it manually ( gulp prefix )
function prefix() {
    // get css files
    return gulp.src('./css/**/*.css')
    // pass css files through autoprefixer
    .pipe(autoprefixer({
            // browsers deprecated, now uses browserslist from package.json
            // browsers: ['last 99 versions'], 
            cascade: false
    }))
    // save the to the css folder
    .pipe(gulp.dest('./css/prefix'))
}

exports.style = style;
exports.watch = watch;
exports.prefix = prefix;
