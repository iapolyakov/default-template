# Default template
> Templates uses gulp#4.0

## About assembly
* Compile [Sass](http://sass-lang.com/) files to CSS
* Minify javascript
* Minify images
* Integration of HTML page templates
* Uses [BrowserSync](http://www.browsersync.io/) to serve your static files to localhost:3000 and to automatically reload your browser when files change.

## Getting started
* Install [Node.js](http://nodejs.org/) if you don't have it
* Install [Gulp](http://gulpjs.com/) (npm i gulpjs/gulp#4.0 -g)
* Install [Bower](http://bower.io/)	(npm i bower -g)
* Then copy the template in a folder (git clone https://github.com/iapolyakov/default-template.git)
* Type in the console
```sh
npm install //Installs server-side dependencies from npm
bower install //Installs packages from bower
```

## CLI Commands
**Compiles your files**
```sh
gulp build
```
**Compiles your files, starts watching files for changes, serves static files to port 3000**
```sh
gulp dev
```

**Production build**
```sh
NODE_ENV=production gulp build
```

## Structure

**public** - directory only to compiled/copied files from **src**

