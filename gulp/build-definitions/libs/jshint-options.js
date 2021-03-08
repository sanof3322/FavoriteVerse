module.exports = {
    "esversion": 8,
    "browser": true,
    "undef": true,
    "varstmt": false,
    "forin": true,
    "unused": true,
    "funcscope": true,
    "lastsemic": true,
    "moz": true,
    "jquery": true,
    "module": true,
    "devel": true,
    "asi": false,//true suppresses warning about missing semicolons
    "globals": {
        "window": true,
        "document": true,
        "console": true,
        "alert": true,
        "kendo": false,
        "define": false,
        "require": false,
        "calstrs": false,
        "grecaptcha": false
    }
};