var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

//Definición puerto por defecto de la app
app.set('port', process.env.PORT || 3000);

//Definición de vistas
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

//Bodyparser, recibir parámetros por post
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Rutas
app.get('/', function(request, response) {
    response.render('index', {
        title: '¡Hola, express!',
        username: 'Rafa'
    });
	//response.send('Hola, Express. Directorio proyecto: ' + __dirname);
});

app.get('/prueba', function(request, response) {
	response.send('Hola, es una prueba');
});

app.get('/users/:userName', function(request, response) {
	var name = request.params.userName;

	response.send('Hola, ' + name + '!');
});

app.get(/\/personal\/(\d*)\/?(edit)?/, function (request, response) {
    var message = 'el perfil del empleado #' + request.params[0];
 
    if (request.params[1] === 'edit') {
        message = 'Editando ' + message; 
    } else {
        message = 'Viendo ' + message;
    }
 
    response.send(message);
 
});

//Server logs
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});