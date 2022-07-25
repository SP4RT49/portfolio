var express = require('express');
var app = express();
const port = 8080;

// intégration d'une feuille de style
app.use(express.static(__dirname + '/public'));

// Tchat Socket.io
const http = require('http');
const server = http.createServer(app);
const {
    Server
} = require("socket.io");
const io = new Server(server);
// 
let isAdmin = false;
let loginError = false;

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
io.on('connection', (socket) => {
    console.log('User connected');
    
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

// ROUTES
app.get('/', function (req, res) {
    
    res.render('./home/home.ejs', {
            pageTitle: 'Accueil',
            isAdmin,
            loginError

        });

    })
    // LOGIN
    .get('/login', function (req, res) {

        res.render('login/login.ejs', {
            pageTitle: 'login',
            isAdmin,
            loginError
        })
    })
    // TELECHARGEMENT
    .get('/download', function (req, res) {
        const file = `./assets/download/text.txt`;
        const name = `text.txt`;
        res.download(file, name);
    })
    // TCHAT
    .get('/tchat', function (req, res) {
        res.render('tchat/tchat.ejs', {
            pageTitle: 'Tchat',
            isAdmin,
            loginError
        });
    })
    // FORMULAIRE DE CONNEXION
    .post('/login', function (req, res) {
        console.log(req.body)
        loginError = false
        if (req.body.username === "admin" && req.body.password === "admin") {
            res.setHeader('Set-Cookie', 'isAdmin=' + true);
            isAdmin = true;
            res.redirect('/')
        } else {
            loginError = true
            res.redirect('/login')
        }
    })
    .get('/logout', function (req, res) {
        isAdmin = false;
        res.setHeader('Set-Cookie', 'isAdmin=' + isAdmin);
        res.redirect('/')
    })



//Error 404
app.use(function (req, res, next) {
    res.status(404).render('404/404.ejs', {isAdmin,loginError});
});

console.log('[' + port + ']Serveur démarré sur http://localhost:'+ port);
server.listen(port);