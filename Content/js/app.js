const app = {
    formHTML(data){
        return /*html*/`
            <section id="form">
                <div class="row">
                    <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="date" class="control-label">Start Date:</label>
                                    <input type="date" 
                                        id="date"                                                
                                        class="form-control" 
                                        required 
                                        onchange="app.dateChanged();return false;" 
                                        value="${data.startDate ? data.startDate : moment().format("L")}">
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label for="page-size" class="control-label">Number of Verses:</label>
                                    <input 
                                        type="text" 
                                        id="page-size"
                                        data-int="" 
                                        class="form-control" 
                                        data-min="1" 
                                        required 
                                        onchange="app.pageSizeChanged();return false;" 
                                        value="${data.PageSize}">
                                </div>
                            </div>
                            <div class="col-md-4">
                                ${data.isLoading == true ? /*html*/`
                                    <button class="btn btn-primary">
                                        <i class="fa fa-refresh fa-spin"></i>
                                        GET INSPIRED
                                    </button>
                                ` : /*html*/`
                                    <button class="btn btn-primary" onclick="app.getKLoveVerse(); return false;">
                                        GET INSPIRED
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                </div>
            </section>
        `;
    },
    versesHTML(data){
        return /*html*/`
            <section id="klove-verses">
                ${data.Verses.map((v, index) => /*html*/`
                    <div class="verse">
                        <div class="row">
                            <div class="col-md-5">
                                <div class="image-wrapper">
                                    <img src="${v.ImageLink}" class="verse-image img-fluid intro" alt="Verse Image">
                                </div>
                            </div><!--image-->
                            <div class="col-md-7">
                                <div class="verse-date">
                                    ${moment(v.VerseDate).format("LL")}
                                </div>
                                <div class="verse-text">
                                    ${v.VerseText}
                                </div>
                                <div class="reference-text">
                                    ${v.ReferenceText} - 
                                    <a href="${v.ReferenceLink}" target="_blank">
                                        Read Full Chapter
                                    </a><br />

                                    Provided by: <a href="${v.BibleReferenceLink}" target="_blank">
                                        New Living Translation
                                    </a>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="social-icons">
                                            <a 
                                                class="icon facebook"
                                                href="https://www.facebook.com/sharer/sharer.php?${v.FacebookShareUrl}" target="_blank">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                            <a 
                                                class="icon twitter"
                                                href="https://twitter.com/share?${v.TwitterShareUrl}" target="_blank">
                                                <i class="fa fa-twitter"></i>
                                            </a>
                                            <a 
                                                class="icon pinterest"
                                                href="https://www.pinterest.com/pin/create/button/?${v.PinterestShareUrl}" target="_blank">
                                                <i class="fa fa-pinterest"></i>
                                            </a>
                                        </div>
                                    </div>
                                    ${data.showFavorites ? /*html*/`
                                        <div class="col-md-6 text-right">
                                            ${v.isLoading ? /*html*/`
                                                <button 
                                                    type="button" class="btn btn-outline-primary btn-favorite">
                                                    <i class="fa fa-refresh fa-spin"></i>
                                                    Remove
                                                </button>
                                            ` : /*html*/`
                                                <button 
                                                    onclick='app.remove(${index}); return false;'
                                                    type="button" class="btn btn-outline-primary btn-favorite">
                                                    <i class="fa fa-trash"></i>
                                                    Remove
                                                </button>
                                            `}<!--isLoading-->
                                        </div>
                                        
                                    ` : /*html*/`
                                        <div class="col-md-6 text-right">
                                            ${v.isLoading ? /*html*/`
                                                <button 
                                                    type="button" class="btn btn-outline-primary btn-favorite">
                                                    <i class="fa fa-refresh fa-spin"></i>
                                                    Add To Favorite
                                                </button>
                                            ` : /*html*/`
                                                ${v.isSuccess ? /*html*/`
                                                    <button 
                                                        type="button" class="btn btn btn-outline-success btn-favorite-success">
                                                        <i class="fa fa-check"></i>
                                                        Added
                                                    </button>
                                                ` : /*html*/`
                                                    <button 
                                                        onclick='app.addToFavorites(${index}, false); return false;'
                                                        type="button" class="btn btn-outline-primary btn-favorite">
                                                        <i class="fa fa-star"></i>
                                                        Add To Favorite
                                                    </button>
                                                `}
                                            `}<!--isLoading-->
                                        </div>
                                    `}
                                </div>
                            </div><!--verse info-->
                        </div>
                    </div>
                `).join("")}

                ${data.Verses.length == 0 ? /*html*/`
                    <div class="verse">
                        <div class="row">
                            <div class="col-md-12 text-center">
                                <div class="verse-text">
                                    No verses <i class="fa fa-blind"></i>. 
                                </div>
                            </div><!--verse info-->
                        </div>
                    </div>
                ` : ``}
            </section>
        `;
    },
    dailyVerseHTML(data){
        return /*html*/`
            <main role="main" class="pb-3">
                <div class="container">
                    ${data.showFavorites == true ? /*html*/`
                        <section id="call-out" class="text-center">
                            <h1>Your Favorite Verses</h1>
                        </section>
                        ${this.versesHTML(data)}
                    ` : /*html*/`
                        <section id="call-out" class="text-center">
                            <h1>Verse of the Day</h1>
                            <h3>A daily Bible verse to strengthen your relationship with God!</h3>
                        </section>
                        ${this.formHTML(data)}
                        ${this.versesHTML(data)}
                    `}
                    
                </div>
            </main>
        `;
    },
    template(data) {
        return /*html*/`
            <header>
                <div class="row">
                    <div class="col-md-5">
                        <a href="/" id="logo">
                            <img src="/img/logo.svg" alt="Logo">
                        </a>
                    </div>
                    <div class="col-sm-7">
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <a class="nav-link" href="/">Daily Verse</a>
                            </li>
                            <li class="nav-item">
                                ${data.isLoading ? /*html*/`
                                    <a class="nav-link" href="#">
                                        <i class="fa fa-refresh fa-spin"></i> 
                                        Favorite Verses
                                    </a>
                                ` : /*html*/`
                                    <a class="nav-link" href="#" onclick="app.navigateToFavorites(); return false;">Favorite Verses</a>
                                `}
                                
                            </li>
                        </ul>
                    </div><!--navs -->
                </div><!--row -->
           </header>
           ${this.dailyVerseHTML(data)}
        `;
    },
    model: {
        startDate: moment().format("L"),
        PageSize: 5,
        isLoading: false,
        showFavorites: false,
        Verses: []
    },
    dateChanged() {
        this.model.startDate = $("#date").val().trim();
    },
    pageSizeChanged() {
        this.model.PageSize = $("#page-size").val().trim();
    },
    remove(i){
        this.model.Verses[i].isLoading = true;
        this.compile();

        this.api(`verse?Id=${this.model.Verses[i].Id}`, {}, "Delete", () => {
            this.model.Verses.splice(i, 1);
            this.compile();
        }, (error) => {
            this.model.Verses[i].isLoading = false;
            this.compile();
            console.log(error);
        });
    },
    navigateToFavorites(){
        if(this.model.showFavorites == true){
            //do nothing
        }else{
            this.model.isLoading = true;
            this.compile();

            this.api("favorite-verses", {}, "Get", (data) => {    
                //console.log(data.Data);            
                this.model.showFavorites = true;
                this.model.isLoading = false;
                this.model.Verses = data.Data;
                this.compile();
            }, (error) => {
                console.log(error);
                this.model.isLoading = false;
                this.compile();
            });
        }
    },
    getKLoveVerse() {
        if ($("#form").validate()) {
            this.model.isLoading = true;
            this.compile();
            console.log(this.model);

            this.api(`k-love/verses?startdate=${this.model.startDate}&PageSize=${this.model.PageSize}`, {}, "Get",
                (data) => {
                    this.model.Verses = data.Data.Verses;
                    this.model.isLoading = false;
                    this.compile();
                }, (error) => {
                    this.model.isLoading = false;
                    this.compile();
                    console.warn(error);
                });
        }
    },
    addToFavorites(index) {
        const username = app.cookies.getCookie("userId");
        let verse = this.model.Verses[index];

        this.model.Verses[index].isLoading = true;
        if(username){
            verse.UserId = username;
        }else{
            verse.UserId = this.generateUUID();
            this.cookies.setCookie("userId", verse.UserId);
        }
        this.model.Verses[index].isLoading = true;
        this.compile();

        this.api(`verse`, verse, "Post", () => {
            this.model.Verses[index].isLoading = false;
            this.model.Verses[index].isSuccess = true;
            this.compile();
        }, (error) => {
            this.model.Verses[index].isLoading = false;
            this.compile();
            console.log(error);
        });
    },
    initData(){
        this.model.isLoading = true;
            this.compile();
            console.log(this.model);

            this.api(`k-love/verses?startdate=${this.model.startDate}&PageSize=${this.model.PageSize}`, {}, "Get",
                (data) => {
                    this.model.Verses = data.Data.Verses;
                    this.model.isLoading = false;
                    this.compile();
                }, (error) => {
                    this.model.isLoading = false;
                    this.compile();
                    console.warn(error);
                });

    },
    init() {
        this.compile();
        this.initData();
    },
    compile() {
        $("#template").html(this.template(this.model));
    },
    generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    },
    cookies: {
        getCookie(cname) {
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
        setCookie(name, value) {
            var d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        },
    },
    api(url, data, type, successCB, errorCB) {
        return $.ajax({
            url: `${JSSettings.baseURL}/${url}`,
            type,
            async: true,
            data: JSON.stringify(data),
            contentType: "application/json",
            error(jqXHR, status, message) {
                if (errorCB == null) {
                    console.warn(message);
                    alert(url + " has failed");
                } else {
                    errorCB(message);
                }
            },
            success(res) {
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

