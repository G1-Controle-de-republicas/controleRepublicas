
module.exports = function (app) {
    app.get('/login', function (req, res) {
        console.log('Recebida requisicao de teste.');
        res.send('OK.');
    });

    app.post('/usuario', function (req, res) {
        var user = req.body;
        console.log("Conectando-se...");

        var connection = app.services.firebaseConnection();
        var userService = new app.services.UsuarioService(connection);

        var usuario = {
            alanisawesome: {
                date_of_birth: "June 23, 1912",
                full_name: "Alan Turing"
            },
            gracehop: {
                date_of_birth: "December 9, 1906",
                full_name: "Grace Hopper"
            }
        };

        userService.criarUsuario(usuario, function (err, res) {
            console.log('Usuario salvo');
            res.json(usuario);
        });

    });
}