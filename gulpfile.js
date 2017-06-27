const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const xo = require('gulp-xo');
const clean = require('gulp-clean');

const gulpTasks = {
    js: {
        taskName: 'js',
        files: 'src/**/*.js'
    },
    lint: {
        taskName: 'lint',
        files: 'src/**/*.js'
    },
    resources: {
        taskName: 'resources',
        files: 'src/**/*.?(css|html|eot|svg|ttf|woff|woff2|json)'
    }
};

gulp.task('clean', () => {
    return gulp.src(['./dist', './release-builds']).pipe(clean());
});

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
        .pipe(gulp.dest('dist'));
});

gulp.task(gulpTasks.lint.taskName, () => {
    return gulp.src(gulpTasks.lint.files)
        .pipe(xo());
});

gulp.task('build', () => {
    for (const value in gulpTasks) {
        gulp.start(gulpTasks[value].taskName);
    }
});

gulp.task('watch', ['build'], () => {
    for (const value in gulpTasks) {
        gulp.watch(gulpTasks[value].files, [gulpTasks[value].taskName]);
    }
});
