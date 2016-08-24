import gulp from 'gulp';
import browserSync from 'browser-sync';
import paths from './paths';

gulp.task('serve', ['watch'], () => {
    browserSync.init({
        open: true,
        notify: true,
        server: {
            baseDir: paths.appDir
        }
    });
});

gulp.task('watch', ['sass', 'lint-js'], () => {
    gulp.watch(paths.glob.scss, ['sass', browserSync.reload]);
    gulp.watch(paths.glob.js, ['lint-js', browserSync.reload]);
    gulp.watch(paths.glob.html, browserSync.reload);
});
