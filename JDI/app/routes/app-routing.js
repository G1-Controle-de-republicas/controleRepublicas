
module.exports = function (app) {
    app.get("/login", function (req, res) {
        res.render("login/login");
    });

    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("*", function (req, res) {
        res.render("404/404");
    });

}