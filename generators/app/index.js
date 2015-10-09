'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var wiredep = require('wiredep');
var camelCase = require('camel-case');


module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log('    ____  __  ____   _____\n   / __ \\/  |/  / | / /   |  ____  ____  _____\n  / / / / /|_/ /  |/ / /| | / __ \\/ __ \\/ ___/\n / /_/ / /  / / /|  / ___ |/ /_/ / /_/ (__  )\n/_____/_/  /_/_/ |_/_/  |_/ .___/ .___/____/\n                         /_/   /_/            \n');

    var prompts = [{
      name:'appName',
      message: 'What\'s your app\'s name?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = camelCase(props.appName);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      //App files
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('./package.json'),
        { appName: this.appName }
      );
      this.fs.copy(
        this.templatePath('env'),
        this.destinationPath('./.env')
      );
      this.fs.copy(
        this.templatePath('_app.js'),
        this.destinationPath('./app.js')
      );
      this.fs.copy(
        this.templatePath('_gulpfile.js'),
        this.destinationPath('./gulpfile.js')
      );
      //Models
      this.fs.copy(
        this.templatePath('_models.js'),
        this.destinationPath('./models/index.js')
      );
      //Routes
      this.fs.copy(
        this.templatePath('_routes.js'),
        this.destinationPath('./routes/index.js')
      );
      this.fs.copy(
        this.templatePath('_home.js'),
        this.destinationPath('./routes/home.js')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('_theme.css'),
        this.destinationPath('./static/css/theme.css')
      );
      this.fs.copy(
        this.templatePath('_custom.scss'),
        this.destinationPath('./static/sass/custom.scss')
      );
      this.fs.copy(
        this.templatePath('_custom.js'),
        this.destinationPath('./static/js/custom.js')
      );
      this.fs.copy(
        this.templatePath('_base.html'),
        this.destinationPath('./templates/base.html')
      );
      this.fs.copy(
        this.templatePath('_index.html'),
        this.destinationPath('./templates/index.html')
      );
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
        this.spawnCommand('gulp');
    });
  },

});
