"use strict";

var app = {
  template: function template(data) {
    return (
      /*html*/
      "\n            <h1>Ghbdtn!</h1>\n        "
    );
  },
  init: function init() {
    $("#template").html(this.template());
  }
};
app.init();