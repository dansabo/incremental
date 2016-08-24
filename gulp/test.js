import gulp from "gulp";
import mocha from "gulp-mocha";
import istanbul from "gulp-istanbul";
import paths from './paths';
import sourcemaps from "gulp-sourcemaps";

gulp.task('pre-test', function () {
    return gulp.src([`${paths.appDir}/**/*.js`])
        .pipe(sourcemaps.init())
        .pipe(istanbul())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('coverage'));
});

gulp.task('test', ['pre-test'], function () {
    gulp.src([`${paths.testDir}/**/*.js`])
        .pipe(mocha({
            compilers: [
                'js:babel-core/register',
            ],
            reporter: 'progress'
        }))
        .pipe(istanbul.writeReports());
});