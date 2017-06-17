const gulp = require('gulp')
sourcemaps = require('gulp-sourcemaps')
babel = require('gulp-babel')
watch = require('gulp-watch')
replace = require('gulp-replace')
plumber = require('gulp-plumber');

const jsFiles = 'src/**/*.js'
resourceFiles = 'src/**/*.?(html|eot|svg|ttf|woff|woff2)';


gulp.task('js', () => {
    return gulp.src(jsFiles)
        .pipe(plumber())
        .pipe(replace('__DEV__', (process.env.NODE_ENV === 'production') ? 'false' : 'true'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
});

gulp.task('resources', () => {
    return gulp.src(resourceFiles)
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () => {
    gulp.watch(resourceFiles, ['resources']);
    gulp.watch(jsFiles, ['js']);
});