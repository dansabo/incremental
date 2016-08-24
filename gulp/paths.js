import path from 'path';

const appName = 'incremental';
const appDirName = 'app';
const testDirName = 'tests';
const releaseDirName = 'dist';
const root = path.dirname(__dirname);
const fontsExtension = '{eot,woff2,woff,ttf,svg}';

export default {
    root : root,
    packageJson : `${root}/package.json`,
    appDir: `${root}/${appDirName}`,
    releaseDir: `${root}/${releaseDirName}`,
    testDir: `${root}/${testDirName}`,
    testReleaseDir: `${root}/${testDirName}/transpiled`,
    release : {
        root : `${root}/${releaseDirName}`
    },
    releaseDirName: releaseDirName,
    app: {
        entryPoint : `${appDirName}/js/app`,
        name: `${appName}`
    },
    local: {
        bootstrap: `${appDirName}/js/local.bootstrap`
    },
    glob: {
        scss : `${root}/${appDirName}/**/*.scss`,
        js : `${root}/${appDirName}/**/!(*.spec).js`,
        fonts : `${root}/${appDirName}/fonts/**/*.${fontsExtension}`,
        projectFonts : `${root}/${appDirName}/**/*.${fontsExtension}`,
        html : `${root}/${appDirName}/**/*.html`
    }
}
