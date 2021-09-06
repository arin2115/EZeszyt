var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require("body-parser");
var helpers = require('./helpers');
var config = require('./config');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var database = require('./db/manager');

var fileStoreOptions = {};

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    store: new FileStore(fileStoreOptions),
    secret: 'verysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.static('public'))

database.db_setup();

// Routers
app.use('/', require('./routers/auth'));

const activeUsers = new Set();

io.on("connection", function (socket) {

    socket.on("newUser", function (data) {
        socket.userId = data;
        activeUsers.add(data);
        io.emit("newUser", [...activeUsers]);
    });

    socket.on("disconnect", () => {
        activeUsers.delete(socket.userId);
        io.emit("disUser", socket.userId);
    });

});

app.get('*', function(req, res){
    res.render('error', { session: req.session, config: config });
});

http.listen(8081, function() {
    console.log('APanel listening on 8081')
});