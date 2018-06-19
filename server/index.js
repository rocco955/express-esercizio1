const express = require('express'),
    path = require('path'),
    PORT = 3000;

let birre = require('./birre').birre;
let app = express();

app.use(express.json());



//prima chiamata da parte del client
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

//chiamata alla lista prodotti
app.get('/birre', function (req, res) {
    res.json(birre);
});

//dettaglio prodotto
app.get('/birre/:id', function (req, res) {
    let id = req.params.id;
    res.json(birre.find(function (birra) {
        return id == birra.id
    }));
});

// inserimento nuovo prodotto
app.post('/birre', function (req, res) {
    var nuovabirra = req.body;
    birre.push(nuovabirra);
    res.json(birre);
});

// cancellazione prodotto
app.delete('/birre/:id', function (req, res) {
    let id = req.params.id;
    var indice = birre.findIndex(function(birra){
        return id == birra.id
    })
    birre.splice(indice, 1)
    res.json(birre);
});

//scaricare qualcosa sul sito
app.get('/birre/download', function (req, res) {
    res.download(path.join(__dirname, '..', 'public', 'esempio1.pdf'));
});

//livereload
var livereload = require('livereload');
var server = livereload.createServer();
server.watch(__dirname);

//da qui parte il server
app.listen(PORT, () =>
    console.log(`http://localhost:${PORT}`));