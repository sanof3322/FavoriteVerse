module.exports = {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "8.0", // I'm building a CLI
            "browsers": "ie > 9" // Just added this to test if it would actually change anything
          },
          "useBuiltIns": "entry",
          "corejs": {
            "version": 3,
            "shippedProposals": true,
            "proposals": true
          }
        }
      ]
    ]
  };