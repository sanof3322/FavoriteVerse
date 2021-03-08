const bundleMe = require("./libs/bundleMe");

module.exports = () => {
    return bundleMe([
        "../Content/js/app.js",
    ], "app.js", "js");    
};