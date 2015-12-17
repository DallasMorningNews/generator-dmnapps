# generator-dmnapps 

A [Yeoman](http://yeoman.io) generator for DMN-flavored node apps.

### Setting up

Install dependencies:

```bash
$ npm install -g yo
$ npm install -g gulp
$ npm install -g nodemon
$ npm install -g shelljs
$ npm install -g generator-dmnapps
```

Also install [ImageMagick](https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Setting-up-your-computer#imagemagick) for rendering images.

Create a clean directory for your app:

```bash
mkdir your-app-directory
cd your-app-directory
```

Finally, initiate the generator in your app directory.

```bash
yo dmnapps
```

**Important:** Pay special attention when prompted to enter the sub- the project will live at on the server. It is not easily changed after being set.


The generator will set up your working directory, install dependencies, copy template files and scripts, start a `nodemon` server and open your browser.

### Developing

This generator use `gulp` to watch your directories for changes, compile scss files and automatically reload your browser.

To start your server:

```bash
$ gulp
```

See the [dmninteractives wiki](https://github.com/DallasMorningNews/generator-dmninteractives/wiki) for information on working with [static files](https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Working-with-static-files) and [HTML templates](https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Working-with-HTML-templates#what-is-templating).

The behavior of the app is similar for static files, except files are rendered directly into the `public` folder, rather than to a `preview` folder.

HTML templates are not rendered into static pages, rather served via the app.

#### Sub-URI

The generator will setup your app to serve from the sub-URI you specified. This is important to remember when navigating routes. For example, a route at `/employees` will be served at `localhost:4000/my-project-name/employees`.

### Deploying your app

There are several gulp tasks to help deploy, serve and take down your app from our servers using git and github.

First, get a developer to setup a directory on the test and production servers for your project. She will clone the project to `var/www/` and create an `.env` file with database and other private credentials.

Available gulp tasks are separated into three categories:

- `deploy` pushes code to the server
- `serve` registers the app with the nginx web server, making your app public
- `pull` de-registers the app with nginx, removing your app from any public URL

Each of these are combined with a suffix to be run on either the test or production server. For example:

`gulp deploy-test` will push code to the test server.

`gulp serve-prod` will make you app public on our `apps.dallasnews.com` production server.

The available deploy tasks are: 

- `gulp deploy-test` 
- `gulp deploy-prod` 
- `gulp serve-test` 
- `gulp serve-prod` 
- `gulp pull-test` 
- `gulp pull-prod` 

**Important:** Before running any of these commands, make sure you've committed the latest changes to your app and pushed them to github.


## License

MIT
