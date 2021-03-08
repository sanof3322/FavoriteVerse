const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

/**
 * Bundles js files specified in @sources and ALWAYS minifies them.
 * @param {[string]} sources - array of file paths
 * @param {string} filename - name of the resulting bundle
 * @param {string} folder - specific folder where bundle will be placed
 */
const bundleMe = (sources, filename, folder = "") => {
    return src(sources)
        .pipe(sourcemaps.init())
        .pipe(concat(filename))
        .pipe(uglify())
        .pipe(dest(`../wwwroot/${folder}`));
};

module.exports = bundleMe;