const app = {
    template(data){
        return /*html*/`
            <h1>Ghbdtn!</h1>
        `;
    },
    init(){

        $("#template").html(this.template());
    }
};

app.init();

