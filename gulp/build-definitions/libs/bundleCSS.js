// Sass task: compiles the style.scss file into style.css
const { src, dest} = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const rebaseUrls = require('gulp-css-url-fix');
const cleanCSS = require('gulp-clean-css');
const gutil = require('gulp-util');

const minifyCSSIfProd = () => {
    return gutil.env.env === 'prod' || gutil.env.env === 'production' || gutil.env.env === 'p'
        ? cleanCSS()
        : gutil.noop();
};

/**
 * Bundles CSS files specified in @sources, but minifies them only if "--env=p" is passed in.
 * @param {[string]} sources - array of file paths
 * @param {string} filename - name of the resulting bundle
 * @param {string} folder - specific folder where bundle will be placed
 * @param {string} disableRebase - false by default
 */
const bundleCSS = (sources, filename, folder = "", disableRebase = false) => {   
    const rebaseIfNeeded = () => {
        return disableRebase == false
            ? rebaseUrls()
            : gutil.noop();
    };
    return src(sources)
                .pipe(sass())
                .pipe(postcss([ autoprefixer(), cssnano() ]))
                // .pipe(sourcemaps.init())
                //.pipe(rebaseIfNeeded())
                // .pipe(sourcemaps.write('.')) 
                .pipe(concat(filename))
                .pipe(minifyCSSIfProd())
                .pipe(dest(`../wwwroot/${folder}`)
            );         
}

module.exports = bundleCSS;