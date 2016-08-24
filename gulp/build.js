import gulp from "gulp";
import sass from "gulp-sass";
import babel from "gulp-babel";
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import minifyCSS from 'gulp-minify-css';
import inject from 'gulp-inject';
import concat from 'gulp-concat';
import zip from 'gulp-zip';
import runSequence from 'run-sequence';
import del from 'del';
import paths from './paths';

let prodFiles = ['css', 'js'].map(ext => `${paths.releaseDir}/${paths.app.name}.min.${ext}`);

gulp.task('build-js', () => {
    return gulp.src(`${paths.appDir}/**/*.js`)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat(`${paths.app.name}.js`))
        .pipe(uglify())
        .pipe(rename({suffix : '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-css', () => {
    return gulp.src(`${paths.appDir}/**/*.scss`)
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-index-html', () => {
    let sources = gulp.src(prodFiles, {read: false});
    return gulp.src(`${paths.appDir}/index.html`)
        .pipe(inject(sources, { ignorePath: paths.releaseDirName, relative: true }))
        .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-zip', () => {
    return gulp.src([`${paths.releaseDir}/**/*`])
        .pipe(zip(`${paths.app.name}.zip`))
        .pipe(gulp.dest(paths.releaseDir))
});

gulp.task('build-clean', (cb) => {
    return del([`${paths.releaseDir}/**/*`, `!${paths.releaseDir}/.keep`], cb);
});

gulp.task('build', (cb) => {
    return runSequence(
        ['build-clean'],
        ['build-js', 'build-css'],
        'build-index-html',
        'build-zip',
        cb);
});
