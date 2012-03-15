
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();
var config = require('./config').config;

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/projects', routes.projects);
app.get('/project/create', routes.create_project);
app.post('/project/create', routes.create_project);
app.get('/project/edit', routes.edit_project);
app.post('/project/edit', routes.edit_project);

app.get('/tasks', routes.tasks);
app.get('/task/create', routes.create_task);
app.post('/task/create', routes.create_task);
app.get('/task/edit', routes.edit_task);
app.post('/task/edit', routes.edit_task);

app.listen(config.port);
console.log("Express server listening on port %d", config.port);
