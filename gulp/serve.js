import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';
import modRewrite  from 'connect-modrewrite';
import paths from './paths';

function startBrowserSync(directoryBase, files, browser) {
    browser = browser === undefined ? 'default' : browser;
    files = files === undefined ? 'default' : files;

    browserSync({
                    files: files,
                    open: true,
                    port: 8000,
                    notify: true,
                    server: {
                        baseDir: directoryBase,
                        middleware: [
                            modRewrite(['!\\.\\w+$ /index.html [L]']) // require for HTML5 mode
                        ]
                    },
                    browser: browser
                });


}

gulp.task('serve', ['watch'], () => {
    startBrowserSync([paths.appDir, './']);
});

gulp.task('web-start', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:5000",
        routes: {
            '../jspm_packages': 'jspm_packages'
        },
        files: ["app/**/*.*", "tests/assets/*"],
        browser: "google chrome",
        port: 7000
    });
});

gulp.task('nodemon', function (cb) {
    var started = false;

    return nodemon(
        {
            script: 'server.js'
        }
    ).on('start', function () {
            if (!started) {
                cb();
                started = true;
            }
        }
    );
});
