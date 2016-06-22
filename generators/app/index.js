'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var wiredep = require('wiredep');
var camelCase = require('camel-case');
var fs = require('fs');


// Dependency CDN files
var optional_cdn = require('./optional_cdn.json');
var required_cdn = require('./required_cdn.json');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log('    ____  __  ____   _____\n   / __ \\/  |/  / | / /   |  ____  ____  _____\n  / / / / /|_/ /  |/ / /| | / __ \\/ __ \\/ ___/\n / /_/ / /  / / /|  / ___ |/ /_/ / /_/ (__  )\n/_____/_/  /_/_/ |_/_/  |_/ .___/ .___/____/\n                         /_/   /_/            \n');

    var prompts = [{
      name:'appName',
      message: 'What\'s your project\'s name?'
    },{
      name:'appURL',
      message: 'What sub-URI will your project live at, e.g.,"top-100"?'
    },{
      name:'awsAccessKey',
      message: 'What\'s your AWS access key?'
    },{
      name:'awsSecretKey',
      message: 'What\'s your AWS secret key?'
    },{
      type: 'checkbox',
      name: 'features',
      message: 'What more would you like?',
      choices: [{
        name: 'JQuery UI',
        value: 'includeJQUI',
        checked: false
      },{
        name: 'JQuery Swipe',
        value: 'includeJQSwipe',
        checked: false
      },{
        name: 'Bowser',
        value: 'includeBowser',
        checked: false
      },{
        name: 'Modernizr',
        value: 'includeModernizr',
        checked: false
      },{
        name: 'D3.js',
        value: 'includeD3',
        checked: false
      },{
        name: 'Leaflet.js',
        value: 'includeLeaflet',
        checked: false
      },{
        name: 'Bootstrap',
        value: 'includeBootstrap',
        checked: false
      }]
    }];

    this.prompt(prompts, function (props) {

      var features = props.features;

      function hasFeature(feat) {
        return features && features.indexOf(feat) !== -1;
      };

      this.projectName = props.appName;
      this.appName = camelCase(props.appName);
      this.appURL = props.appURL;
      this.awsAccessKey = props.awsAccessKey;
      this.awsSecretKey = props.awsSecretKey;
      this.dependencies = {};
      this.dependencies.includeJQUI = hasFeature('includeJQUI');
      this.dependencies.includeJQSwipe = hasFeature('includeJQSwipe');
      this.dependencies.includeBowser = hasFeature('includeBowser');
      this.dependencies.includeModernizr = hasFeature('includeModernizr');
      this.dependencies.includeD3 = hasFeature('includeD3');
      this.dependencies.includeLeaflet = hasFeature('includeLeaflet');
      this.dependencies.includeBootstrap = hasFeature('includeBootstrap');

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      //App files
      this.fs.copyTpl(
        this.templatePath('package.json'),
        this.destinationPath('./package.json'),
        { appName: this.appName }
      );
      this.fs.copy(
        this.templatePath('env'),
        this.destinationPath('./.env')
      );
      this.fs.copyTpl(
        this.templatePath('app.js'),
        this.destinationPath('./app.js'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('gulpfile.js'),
        this.destinationPath('./gulpfile.js'),
        { appURL: this.appURL }
      );
      this.fs.copy(
        this.templatePath('nodemon.js'),
        this.destinationPath('./nodemon.js')
      );
      //Models
      this.fs.copy(
        this.templatePath('models/index.js'),
        this.destinationPath('./models/index.js')
      );
      //Routes
      this.fs.copy(
        this.templatePath('routes/index.js'),
        this.destinationPath('./routes/index.js')
      );
      this.fs.copy(
        this.templatePath('routes/home.js'),
        this.destinationPath('./routes/home.js')
      );
    },

    projectfiles: function () {

      /////////////////////////////////////////////////
      // Fetch remote template files from github
      // hosted in interactives_starterkit

      // HTML
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/templates/base.html','./templates/',function(err){});
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/templates/index.html','./templates/',function(err){});
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/templates/adblock1.html','./templates/', function(err){});
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/templates/adblock2.html','./templates/', function(err){});
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/templates/adblock3.html','./templates/', function(err){});
      this.fs.copy(
        this.templatePath('img.html'),
        this.destinationPath('./templates/partials/img.html')
      );
      // SCSS
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/css/theme.scss','./build/sass/',function(err){
        if(err){ console.log(err);}
        fs.rename('./build/sass/theme.scss','./build/sass/+base.scss');
      });
      this.fs.copy(
        this.templatePath('custom.scss'),
        this.destinationPath('./build/sass/+custom.scss')
      );
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/css/_variables.scss','./build/sass/',function(err){
        if(err){ console.log(err);}
      });
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/css/_mixins.scss','./build/sass/',function(err){
        if(err){ console.log(err);}
      });
      // JS
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/js/customJS.js','./build/js/',function(err){
        if(err){ console.log(err);}
        fs.rename('./build/js/customJS.js','./build/js/+custom.js');
      });
      // IMG
      this.fetch('https://raw.githubusercontent.com/DallasMorningNews/interactives_starterkit/master/images/_defaultImage.jpg','./build/images/',function(err){
        if(err){ console.log(err);}
      });

      mkdirp('./build/assets');
      mkdirp('./public');

      // Deploy scripts
      this.fs.copyTpl(
        this.templatePath('deploy/nginx'),
        this.destinationPath('./deploy/nginx'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('deploy/pull_prod.sh'),
        this.destinationPath('./deploy/pull_prod.sh'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('deploy/pull_test.sh'),
        this.destinationPath('./deploy/pull_test.sh'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('deploy/send_prod.sh'),
        this.destinationPath('./deploy/send_prod.sh'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('deploy/send_test.sh'),
        this.destinationPath('./deploy/send_test.sh'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('deploy/serve_prod.sh'),
        this.destinationPath('./deploy/serve_prod.sh'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('deploy/serve_test.sh'),
        this.destinationPath('./deploy/serve_test.sh'),
        { appURL: this.appURL }
      );
      this.fs.copyTpl(
        this.templatePath('deploy/worker.sh'),
        this.destinationPath('./deploy/worker.sh'),
        { appURL: this.appURL }
      );
    },

    optional_dependencies: function(){
      // Pass a single url or an array to yeoman's fetch.
      var dependencyFetch = function(generator, dependency){
            var dest = './build/vendor';
            if(Array.isArray(dependency)){
              for(var i in dependency){
                generator.fetch(dependency[i], dest, function(err){});
              };
            }else{
              generator.fetch(dependency, dest, function(err){});
            }
          };

      if(this.dependencies.includeJQUI){
        dependencyFetch(this, optional_cdn.JQUI);
      }
      if(this.dependencies.includeJQSwipe){
        dependencyFetch(this, optional_cdn.JQSwipe);
      }
      if(this.dependencies.includeBowser){
        dependencyFetch(this, optional_cdn.Bowser);
      }
      if(this.dependencies.includeModernizr){
        dependencyFetch(this, optional_cdn.Modernizr);
      }
      if(this.dependencies.includeD3){
        dependencyFetch(this, optional_cdn.D3);
      }
      if(this.dependencies.includeLeaflet){
        dependencyFetch(this, optional_cdn.Leaflet);
      }
      if(this.dependencies.includeBootstrap){
        dependencyFetch(this, optional_cdn.Bootstrap);
      }
    },

    meta: function(){
      var timestamp = new Date();
      var metaJson = {
        name: this.projectName,
        publishYear: timestamp.getFullYear(),
        publishDate: timestamp.getFullYear() +"-"+(timestamp.getMonth()+1)+"-"+timestamp.getDate()+"T00:00:00Z",
        description: '<Project description>',
        url: 'interactives.dallasnews.com/' + timestamp.getFullYear() +"/"+this.appName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()+"/",
        id: (Math.floor(Math.random() * 100000000000) + 1).toString() ,
        authors: '<Project authors>',
        authorsFbook: '<Project authors\' facebook links>',
        desk: '<e.g., entertainment>',
        section: '<e.g., books>',
        keywords: ["interactives","dallas","dallas news","dfw news","dallas newspaper","dallas morning news","dallas morning news newspaper"],
        imgURL: '<Preview image url>',
        imgWidth: '<Preview image width>',
        imgHeight: '<Preview image height>',
        twitter: '<@siteHandle e.g. @dallasnews>',
        authorTwitter: '<@twitterHandle e.g. @AlanPeppard>'
      }
      this.fs.writeJSON('meta.json', metaJson);
    },

    git: function () {
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('./.gitignore'));

    },
  },

  install: function () {
    this.installDependencies({
      callback: function() {
                // Emit a new event - dependencies installed
                this.emit('dependenciesInstalled');
            }.bind(this)
    });

    this.on('dependenciesInstalled', function() {
        this.spawnCommand('gulp', ['img']);
        this.spawnCommand('gulp');
    });

  },

});
