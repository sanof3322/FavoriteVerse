const { src, dest } = require('gulp');

/**
 * Copies js files specified in @sources into a @folder location.
 * @param {[string]} sources - array of file paths
 * @param {string} folder - specific folder where bundle will be placed
 */
const bundleMe = (sources, folder = "") => {
    return src(sources)
            .pipe(dest(`../../app/${folder}`));
};

module.exports = bundleMe;