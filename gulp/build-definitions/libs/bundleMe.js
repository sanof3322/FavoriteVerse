const { src, dest } = require('gulp');
const concat = require('gulp-concat');
const uglifyIfNeeded = require('./uglifyIfNeeded');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');
const reporterStylish = require('../libs/reporter');
const jshintOptions = require('./jshint-options');
const babelPresets = require("../../babel.config");

// const webpack = require("webpack-stream");
//more about jshint options https://github.com/Microsoft/vscode-jshint/issues/35 and here https://jshint.com/docs/

/**
 * Bundles js files specified in @sources, but minifies them only if "--env=p" is passed in.
 * @param {[string]} sources - array of file paths
 * @param {string} filename - name of the resulting bundle
 * @param {string} folder - specific folder where bundle will be placed
 */
const bundleMe = (sources, filename, folder = '') => {
    return src(sources)
        .pipe(sourcemaps.init())
        .pipe(jshint(jshintOptions))
        .pipe(jshint.reporter(reporterStylish, { verbose: true, filter: true })) //filter: false - reports all warnings and errors
        //.pipe(jshint.reporter('fail'))
        .pipe(babel(babelPresets))
        //webpack doesn't work with require.js, 
        //so either use webpack or require
        // .pipe(webpack({
        //     mode: 'development'
        //     // Any configuration options...
        //   }))
        .pipe(concat(filename))
        .pipe(uglifyIfNeeded())
        .pipe(dest(`../wwwroot/${folder}`));
};

module.exports = bundleMe;