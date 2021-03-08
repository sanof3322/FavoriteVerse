"use strict";

var app = {
  formHTML: function formHTML(data) {
    return (
      /*html*/
      "\n            <section id=\"form\">\n                <div class=\"row\">\n                    <div class=\"col-md-2\"></div>\n                    <div class=\"col-md-8\">\n                        <div class=\"row\">\n                            <div class=\"col-md-4\">\n                                <div class=\"form-group\">\n                                    <label for=\"date\" class=\"control-label\">Start Date:</label>\n                                    <input type=\"date\" \n                                        id=\"date\"                                                \n                                        class=\"form-control\" \n                                        required \n                                        onchange=\"app.dateChanged();return false;\" \n                                        value=\"".concat(data.startDate ? data.startDate : moment().format("L"), "\">\n                                </div>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <div class=\"form-group\">\n                                    <label for=\"page-size\" class=\"control-label\">Number of Verses:</label>\n                                    <input \n                                        type=\"text\" \n                                        id=\"page-size\"\n                                        data-int=\"\" \n                                        class=\"form-control\" \n                                        data-min=\"1\" \n                                        required \n                                        onchange=\"app.pageSizeChanged();return false;\" \n                                        value=\"").concat(data.PageSize, "\">\n                                </div>\n                            </div>\n                            <div class=\"col-md-4\">\n                                ").concat(data.isLoading == true ?
      /*html*/
      "\n                                    <button class=\"btn btn-primary\">\n                                        <i class=\"fa fa-refresh fa-spin\"></i>\n                                        GET INSPIRED\n                                    </button>\n                                " :
      /*html*/
      "\n                                    <button class=\"btn btn-primary\" onclick=\"app.getKLoveVerse(); return false;\">\n                                        GET INSPIRED\n                                    </button>\n                                ", "\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"col-md-2\"></div>\n                </div>\n            </section>\n        ")
    );
  },
  versesHTML: function versesHTML(data) {
    return (
      /*html*/
      "\n            <section id=\"klove-verses\">\n                ".concat(data.Verses.map(function (v, index) {
        return (
          /*html*/
          "\n                    <div class=\"verse\">\n                        <div class=\"row\">\n                            <div class=\"col-md-5\">\n                                <div class=\"image-wrapper\">\n                                    <img src=\"".concat(v.ImageLink, "\" class=\"verse-image img-fluid intro\" alt=\"Verse Image\">\n                                </div>\n                            </div><!--image-->\n                            <div class=\"col-md-7\">\n                                <div class=\"verse-date\">\n                                    ").concat(moment(v.VerseDate).format("LL"), "\n                                </div>\n                                <div class=\"verse-text\">\n                                    ").concat(v.VerseText, "\n                                </div>\n                                <div class=\"reference-text\">\n                                    ").concat(v.ReferenceText, " - \n                                    <a href=\"").concat(v.ReferenceLink, "\" target=\"_blank\">\n                                        Read Full Chapter\n                                    </a><br />\n\n                                    Provided by: <a href=\"").concat(v.BibleReferenceLink, "\" target=\"_blank\">\n                                        New Living Translation\n                                    </a>\n                                </div>\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        <div class=\"social-icons\">\n                                            <a \n                                                class=\"icon facebook\"\n                                                href=\"https://www.facebook.com/sharer/sharer.php?").concat(v.FacebookShareUrl, "\" target=\"_blank\">\n                                                <i class=\"fa fa-facebook\"></i>\n                                            </a>\n                                            <a \n                                                class=\"icon twitter\"\n                                                href=\"https://twitter.com/share?").concat(v.TwitterShareUrl, "\" target=\"_blank\">\n                                                <i class=\"fa fa-twitter\"></i>\n                                            </a>\n                                            <a \n                                                class=\"icon pinterest\"\n                                                href=\"https://www.pinterest.com/pin/create/button/?").concat(v.PinterestShareUrl, "\" target=\"_blank\">\n                                                <i class=\"fa fa-pinterest\"></i>\n                                            </a>\n                                        </div>\n                                    </div>\n                                    ").concat(data.showFavorites ?
          /*html*/
          "\n                                        <div class=\"col-md-6 text-right\">\n                                            ".concat(v.isLoading ?
          /*html*/
          "\n                                                <button \n                                                    type=\"button\" class=\"btn btn-outline-primary btn-favorite\">\n                                                    <i class=\"fa fa-refresh fa-spin\"></i>\n                                                    Remove\n                                                </button>\n                                            " :
          /*html*/
          "\n                                                <button \n                                                    onclick='app.remove(".concat(index, "); return false;'\n                                                    type=\"button\" class=\"btn btn-outline-primary btn-favorite\">\n                                                    <i class=\"fa fa-trash\"></i>\n                                                    Remove\n                                                </button>\n                                            "), "<!--isLoading-->\n                                        </div>\n                                        \n                                    ") :
          /*html*/
          "\n                                        <div class=\"col-md-6 text-right\">\n                                            ".concat(v.isLoading ?
          /*html*/
          "\n                                                <button \n                                                    type=\"button\" class=\"btn btn-outline-primary btn-favorite\">\n                                                    <i class=\"fa fa-refresh fa-spin\"></i>\n                                                    Add To Favorite\n                                                </button>\n                                            " :
          /*html*/
          "\n                                                ".concat(v.isSuccess ?
          /*html*/
          "\n                                                    <button \n                                                        type=\"button\" class=\"btn btn btn-outline-success btn-favorite-success\">\n                                                        <i class=\"fa fa-check\"></i>\n                                                        Added\n                                                    </button>\n                                                " :
          /*html*/
          "\n                                                    <button \n                                                        onclick='app.addToFavorites(".concat(index, ", false); return false;'\n                                                        type=\"button\" class=\"btn btn-outline-primary btn-favorite\">\n                                                        <i class=\"fa fa-star\"></i>\n                                                        Add To Favorite\n                                                    </button>\n                                                "), "\n                                            "), "<!--isLoading-->\n                                        </div>\n                                    "), "\n                                </div>\n                            </div><!--verse info-->\n                        </div>\n                    </div>\n                ")
        );
      }).join(""), "\n\n                ").concat(data.Verses.length == 0 ?
      /*html*/
      "\n                    <div class=\"verse\">\n                        <div class=\"row\">\n                            <div class=\"col-md-12 text-center\">\n                                <div class=\"verse-text\">\n                                    No verses <i class=\"fa fa-blind\"></i>. \n                                </div>\n                            </div><!--verse info-->\n                        </div>\n                    </div>\n                " : "", "\n            </section>\n        ")
    );
  },
  dailyVerseHTML: function dailyVerseHTML(data) {
    return (
      /*html*/
      "\n            <main role=\"main\" class=\"pb-3\">\n                <div class=\"container\">\n                    ".concat(data.showFavorites == true ?
      /*html*/
      "\n                        <section id=\"call-out\" class=\"text-center\">\n                            <h1>Your Favorite Verses</h1>\n                        </section>\n                        ".concat(this.versesHTML(data), "\n                    ") :
      /*html*/
      "\n                        <section id=\"call-out\" class=\"text-center\">\n                            <h1>Verse of the Day</h1>\n                            <h3>A daily Bible verse to strengthen your relationship with God!</h3>\n                        </section>\n                        ".concat(this.formHTML(data), "\n                        ").concat(this.versesHTML(data), "\n                    "), "\n                    \n                </div>\n            </main>\n        ")
    );
  },
  template: function template(data) {
    return (
      /*html*/
      "\n            <header>\n                <div class=\"row\">\n                    <div class=\"col-md-5\">\n                        <a href=\"/\" id=\"logo\">\n                            <img src=\"/img/logo.svg\" alt=\"Logo\">\n                        </a>\n                    </div>\n                    <div class=\"col-sm-7\">\n                        <ul class=\"nav nav-pills\">\n                            <li class=\"nav-item\">\n                                <a class=\"nav-link\" href=\"/\">Daily Verse</a>\n                            </li>\n                            <li class=\"nav-item\">\n                                ".concat(data.isLoading ?
      /*html*/
      "\n                                    <a class=\"nav-link\" href=\"#\">\n                                        <i class=\"fa fa-refresh fa-spin\"></i> \n                                        Favorite Verses\n                                    </a>\n                                " :
      /*html*/
      "\n                                    <a class=\"nav-link\" href=\"#\" onclick=\"app.navigateToFavorites(); return false;\">Favorite Verses</a>\n                                ", "\n                                \n                            </li>\n                        </ul>\n                    </div><!--navs -->\n                </div><!--row -->\n           </header>\n           ").concat(this.dailyVerseHTML(data), "\n        ")
    );
  },
  model: {
    startDate: moment().format("L"),
    PageSize: 5,
    isLoading: false,
    showFavorites: false,
    Verses: []
  },
  dateChanged: function dateChanged() {
    this.model.startDate = $("#date").val().trim();
  },
  pageSizeChanged: function pageSizeChanged() {
    this.model.PageSize = $("#page-size").val().trim();
  },
  remove: function remove(i) {
    var _this = this;

    this.model.Verses[i].isLoading = true;
    this.compile();
    this.api("verse?Id=".concat(this.model.Verses[i].Id), {}, "Delete", function () {
      _this.model.Verses.splice(i, 1);

      _this.compile();
    }, function (error) {
      _this.model.Verses[i].isLoading = false;

      _this.compile();

      console.log(error);
    });
  },
  navigateToFavorites: function navigateToFavorites() {
    var _this2 = this;

    if (this.model.showFavorites == true) {//do nothing
    } else {
      this.model.isLoading = true;
      this.compile();
      var UserId = this.cookies.getCookie("userId");
      this.api("favorite-verses?UserId=".concat(UserId), {}, "Get", function (data) {
        //console.log(data.Data);            
        _this2.model.showFavorites = true;
        _this2.model.isLoading = false;
        _this2.model.Verses = data.Data;

        _this2.compile();
      }, function (error) {
        console.log(error);
        _this2.model.isLoading = false;

        _this2.compile();
      });
    }
  },
  getKLoveVerse: function getKLoveVerse() {
    var _this3 = this;

    if ($("#form").validate()) {
      this.model.isLoading = true;
      this.compile();
      console.log(this.model);
      this.api("k-love/verses?startdate=".concat(this.model.startDate, "&PageSize=").concat(this.model.PageSize), {}, "Get", function (data) {
        _this3.model.Verses = data.Data.Verses;
        _this3.model.isLoading = false;

        _this3.compile();
      }, function (error) {
        _this3.model.isLoading = false;

        _this3.compile();

        console.warn(error);
      });
    }
  },
  addToFavorites: function addToFavorites(index) {
    var _this4 = this;

    var username = app.cookies.getCookie("userId");
    var verse = this.model.Verses[index];
    this.model.Verses[index].isLoading = true;

    if (username) {
      verse.UserId = username;
    } else {
      verse.UserId = this.generateUUID();
      this.cookies.setCookie("userId", verse.UserId);
    }

    this.model.Verses[index].isLoading = true;
    this.compile();
    this.api("verse", verse, "Post", function () {
      _this4.model.Verses[index].isLoading = false;
      _this4.model.Verses[index].isSuccess = true;

      _this4.compile();
    }, function (error) {
      _this4.model.Verses[index].isLoading = false;

      _this4.compile();

      console.log(error);
    });
  },
  initData: function initData() {
    var _this5 = this;

    this.model.isLoading = true;
    this.compile();
    console.log(this.model);
    this.api("k-love/verses?startdate=".concat(this.model.startDate, "&PageSize=").concat(this.model.PageSize), {}, "Get", function (data) {
      _this5.model.Verses = data.Data.Verses;
      _this5.model.isLoading = false;

      _this5.compile();
    }, function (error) {
      _this5.model.isLoading = false;

      _this5.compile();

      console.warn(error);
    });
  },
  init: function init() {
    this.compile();
    this.initData();
  },
  compile: function compile() {
    $("#template").html(this.template(this.model));
  },
  generateUUID: function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
  },
  cookies: {
    getCookie: function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }

      return "";
    },
    setCookie: function setCookie(name, value) {
      var d = new Date();
      d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
  },
  api: function api(url, data, type, successCB, errorCB) {
    return $.ajax({
      url: "".concat(JSSettings.baseURL, "/").concat(url),
      type: type,
      async: true,
      data: JSON.stringify(data),
      contentType: "application/json",
      error: function error(jqXHR, status, message) {
        if (errorCB == null) {
          console.warn(message);
          alert(url + " has failed");
        } else {
          errorCB(message);
        }
      },
      success: function success(res) {
        if (successCB == null) {
          console.log(res);
          return res;
        } else {
          successCB(res);
        }
      }
    });
  }
};
app.init();