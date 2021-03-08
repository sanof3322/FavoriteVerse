const bundleLibs = require("./libs/bundleLibs");
  
module.exports = () => {
    return bundleLibs([
        "./node_modules/jquery/dist/jquery.js",      
        "./node_modules/bootstrap/dist/js/bootstrap.js",     
    ], "libs.js", "js");    
};