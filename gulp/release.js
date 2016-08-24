import gulp from 'gulp';
import release from 'gulp-release';

release.register(gulp,
    {
        packages: ['package.json'],
        messages: {
            bump: 'version bump',
            next: 'next development version'
        }
    });