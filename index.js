'use strict';
// creating a express app
var express = require('express'),
  app = express( );

// make a static directory
app.use( express.static( __dirname + '/public') );
app.use( express.bodyParser() );

// engine
app.set('views', __dirname + '/templates'); // the directory to grab views from
app.set('view engine', 'hbs'); // setting extension for views
app.engine('hbs', require('hbs').__express);  // when extension use this engine

// routing
app.get('/', function( req, res ) {
  res.send('Hello World ' + (req.query.name || '')); // send back basic text/html
});

app.get('/engine', function( req, res ) {
  res.render('index', {
      name : req.query.name || 'world',
      items : [
        'making a express app',
        'routing',
        'static directory',
        'engines',
        'middleware'
      ]
  });
});

app.get('/form', function( req, res ) {
  res.render('form');
}); 

app.post('/submit', function( req, res) {
  var body = req.body;
  console.log( req.query, req.params, req.body );
  res.render('result', body);
});

// listening to port
app.listen( process.env.PORT || 3000 );