const bundleCSS = require("./libs/bundleCSS");

module.exports = () => {
    return bundleCSS([
        "../Content/css/styles.scss",
    ], "styles.css", "css", true);    
};