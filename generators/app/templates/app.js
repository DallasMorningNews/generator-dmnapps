'use strict';
var express = require('express'),
    nunjucks = require('nunjucks'),
    http = require('http'),
    orm = require('orm');

/*-------------------------------------------------------
    APP
-------------------------------------------------------*/

var app = express();


/*-------------------------------------------------------
    DATABASE
-------------------------------------------------------*/

//Enter DB credentials in .env file
require('dotenv').load();

// App connects to mysql database using credentials set in .env file
// process.env object is created by the dotenv load line above

/*app.use(orm.express("mysql://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST, {
    

    define: function (db, models, next) {

        db.load("./models/<model file>",function(err){
          models.model_name = db.models.table_name;
        });
        // ...

        db.sync();
        next();
    }
}));*/


/*-------------------------------------------------------
    ROUTES
-------------------------------------------------------*/

// Use an express router instead of the app itself to define routes.
// This lets us have more control over the location of the routes, for example
// mounting all the routes on a specific path for the app. See below.

var appRouter = express.Router();

require('./routes/index')(appRouter)

// Mount the router at a URL and all the router's other routes
// will be mounted below it, e.g., localhost:4000/<%= appURL %>/homepage.html, etc.

app.use('/<%= appURL %>', appRouter);


/*-------------------------------------------------------
    STATIC FILES
-------------------------------------------------------*/

app.use('/<%= appURL %>', express.static('public'));


/*-------------------------------------------------------
    TEMPLATES
-------------------------------------------------------*/

var nenv = nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    watch: true
});


/*-------------------------------------------------------
    SERVER
-------------------------------------------------------*/

var server = http.createServer(app);
server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});