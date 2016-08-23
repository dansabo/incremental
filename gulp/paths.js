import path from 'path';

const appName = 'thirdPartyCredit';
const appDirName = 'app';
const testDirName = 'tests';
const releaseDirName = 'dist';
const root = path.dirname(__dirname);
const fontsExtension = '{eot,woff2,woff,ttf,svg}';

export default {
    root : root,
    systemConfigJs : `${root}/${appDirName}/config/jspm.config.js`,
    packageJson : `${root}/package.json`,
    appDir: `${root}/${appDirName}`,
    releaseDir: `${root}/${releaseDirName}`,
    testDir: `${root}/${testDirName}`,
    release : {
        root : `${root}/${releaseDirName}`,
        fonts : `${root}/${releaseDirName}/fonts`
    },
    releaseDirName: releaseDirName,
    jspm : {
        fonts : `${root}/jspm_packages/**/*.${fontsExtension}`
    },
    app: {
        entryPoint : `${appDirName}/src/app`,
        name: `cdk.credit.${appName}`
    },
    local: {
        bootstrap: `${appDirName}/src/local.bootstrap`
    },
    glob: {
        scss : `${root}/${appDirName}/**/*.scss`,
        js : `${root}/${appDirName}/**/!(*.spec).js`,
        fonts : `${root}/${appDirName}/fonts/**/*.${fontsExtension}`,
        projectFonts : `${root}/${appDirName}/**/*.${fontsExtension}`,
        html : `${root}/${appDirName}/**/*.html`
    }
}
