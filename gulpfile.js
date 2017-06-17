const gulp = require('gulp')
sourcemaps = require('gulp-sourcemaps')
babel = require('gulp-babel')
watch = require('gulp-watch')
replace = require('gulp-replace')
plumber = require('gulp-plumber');

const gulpTasks = {
    js: {
        taskName: 'js',
        files: 'src/**/*.js'
    },
    resources: {
        taskName: 'resources',
        files: 'src/**/*.?(html|eot|svg|ttf|woff|woff2)'
    }
}

gulp.task(gulpTasks.resources.taskName, () => {
    return gulp.src(gulpTasks.resources.files)
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task(gulpTasks.js.taskName, () => {
    return gulp.src(gulpTasks.js.files)
        .pipe(plumber())
        .pipe(replace('__DEV__', (process.env.NODE_ENV === 'production') ? 'false' : 'true'))
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
})

gulp.task('build', () => {
    for (let value in gulpTasks) {
        gulp.start(gulpTasks[value].taskName);
    }
})

gulp.task('watch', () => {
    for (let value in gulpTasks) {
        gulp.watch(gulpTasks[value].files, [gulpTasks[value].taskName]);
    }
    // gulp.watch(jsFiles, ['js']);
});