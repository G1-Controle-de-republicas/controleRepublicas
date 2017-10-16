
module.exports = function (app) {
    app.get("/login", function (req, res) {
        res.render("login/login");
    });

    app.get("/listagem", function (req, res) {
        res.render("listagem/listagem");
    });

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("*", function (req, res) {
        res.render("404/404");
    });

}