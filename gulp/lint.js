import gulp from 'gulp';
import eslint from 'gulp-eslint';
import paths from './paths';

gulp.task('lint-js', () => {
    return gulp.src([paths.glob.js])
        .pipe(eslint())
        .pipe(eslint.format());
});