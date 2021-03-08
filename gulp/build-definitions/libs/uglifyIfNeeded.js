const gutil = require('gulp-util');
const uglify = require('gulp-uglify');

const environment = gutil.env.env;

/**
 * Returns uglify() pipe if "--env=p" is passed in. 
 */
const uglifyIfNeeded = () => {
    return environment === 'prod' || environment === 'production' || environment === 'p'
        ? uglify()
        : gutil.noop();
};

module.exports = uglifyIfNeeded;