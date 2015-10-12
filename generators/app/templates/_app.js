'use strict';
var express = require('express'),
    nunjucks = require('nunjucks'),
    http = require('http'),
    orm = require('orm');


var app = express();
var server = http.createServer(app);

nunjucks.configure('templates', {
    autoescape: true,
    express: app,
    watch: true
});

app.use(express.static('static'));


/*-------------------------------------------------------
            DATABASE
-------------------------------------------------------*/

//Enter DB credentials in .env file
require('dotenv').load();

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

require('./routes/index')(app);

/*-------------------------------------------------------
            Server
-------------------------------------------------------*/
server.listen(3000, 'localhost');
server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});