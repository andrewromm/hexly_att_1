const gulp = require('gulp'); 
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
// const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();


// Compile SCSS to CSS
function compileSass() {
    return gulp
      .src('app/styles/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
}

// Minify CSS
function minifyCSS() {
    return gulp
        .src('dist/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
}

// Minify JavaScript
function minifyJS() {
    return gulp
        .src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
}

// Optimize images
function optimizeImages() {
    return gulp
        .src('app/images/*')
        // .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

// Serve and watch for changes
function serve() {
    browserSync.init({
        server: './',
    });

    gulp.watch('app/styles/*.scss', compileSass);
    // gulp.watch('app/js/*.js', minifyJS);
    gulp.watch('app/images/*', optimizeImages);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Define default task
gulp.task('default', gulp.parallel(serve));
