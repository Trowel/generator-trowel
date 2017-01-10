/*jshint -W097 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var caseFilter = require('./case-filters.js')();

var validateString = function(input) {
  if (typeof input !== 'string') {
    this.log(chalk.red('You must pass a valid string !'));
    return false;
  } else if (input.length === 0) {
    this.log(chalk.red('Tss Tss Tss, Write something !'));
    return false;
  }
  return true;
};

module.exports = yeoman.Base.extend({
  initializing: function() {
    this.option('noinstall');

    // Have Yeoman greet the user.
    this.log(yosay(
      'It\'s time to make some ' + chalk.red('trowel') + '!'
    ));

    this.folders = {
      src: 'src',
      dest: 'dest',
      test: 'test',
      styleguide: 'styleguide',
    };
  },

  prompting: function () {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your trowel component ?',
        required: true,
        validate: function(input) {
          if (typeof input !== 'string') {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          } else if (input.length === 0) {
            this.log(chalk.red('Tss Tss Tss, Write something !'));
            return false;
          }
          return true;
        }.bind(this),
        filter: function(input) {
          let isPlural = input.slice(-1) === 's';
          let singular = isPlural ? input.slice(0, input.length - 1) : input;
          let plural = isPlural ? input : input + 's';

          this.names = {
            camelcase: {
              singular: caseFilter.toCamelCase(singular),
              plural: caseFilter.toCamelCase(plural),
            },
            pascalcase: {
              singular: caseFilter.toPascalCase(singular),
              plural: caseFilter.toPascalCase(plural),
            },
            kebabcase: {
              singular: caseFilter.toKebabCase(singular),
              plural: caseFilter.toKebabCase(plural),
            },
            lowercase: {
              singular: caseFilter.toLowerCase(singular),
              plural: caseFilter.toLowerCase(plural),
            },
            capitalcase: {
              singular: caseFilter.toCapitalCase(singular),
              plural: caseFilter.toCapitalCase(plural),
            },
            attachedcase: {
              singular: caseFilter.toAttachedCase(singular),
              plural: caseFilter.toAttachedCase(plural),
            },
          }

          return input.charAt(0).toUpperCase() + input.slice(1).replace(' ', '-');
        }.bind(this),
      },

      {
        type: 'input',
        name: 'description',
        message: 'What is the description of your component ?',
        required: true,
        default: function(answers) {
          return 'The official Trowel Component for ' + this.names.lowercase.plural;
        }.bind(this),
        validate: function(input) {
          if (typeof input !== 'string') {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          } else if (input.length === 0) {
            this.log(chalk.red('Tss Tss Tss, Write something !'));
            return false;
          }
          return true;
        }.bind(this),
      },

      {
        type: 'input',
        name: 'url',
        message: 'What is the url of the repository ?',
        default: function(answers) {
          return 'https://github.com/FriendsOfTrowel/' + this.names.pascalcase.plural;
        }.bind(this),
        validate: function(input) {
          if (typeof input !== 'string' || input.length === 0) {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true
      },

      {
        type: 'input',
        name: 'packageName',
        message: 'What\'s the name of your future packages (for bower/npm/yarn) ?',
        default: function(answers) {
          return 'trowel-' + this.names.kebabcase.plural;
        }.bind(this),
        // @TODO check with bower and npm API if names are availables
        validate: function(input) {
          if (typeof input !== 'string' || input.length === 0) {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true,
      },

      {
        type: 'input',
        name: 'author_name',
        message: 'What is your name ?',
        default: 'Loïc Goyet',
        validate: function(input) {
          if (typeof input !== 'string' || input.length === 0) {
            this.log(chalk.red('You must pass a valid string !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true
      },

      {
        type: 'input',
        name: 'author_mail',
        message: 'What is your mail address ?',
        default: 'loic@troopers.email',
        validate: function(input) {
          var mailregex = /\S+@\S+\.\S+/;
          if (!mailregex.test(input)) {
            this.log(chalk.red('You must pass a valid mail !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true
      },

      {
        type: 'confirm',
        name: 'twig',
        required: true,
        default: false,
        message: function(answers) {
          return 'And what about some twig template ? (located at `' + this.folders.src + '/twig/' + this.names.kebabcase.plural + '.html.twig`)';
        }.bind(this),
      },

      {
        type: 'confirm',
        name: 'javascript',
        required: true,
        default: false,
        message: function(answers) {
          return 'Some javascript file with it ? (located at `' + this.folders.src + '/javascript/' + this.names.kebabcase.plural + '.js`)';
        }.bind(this),
      },
    ]).then(function (props) {
      this.props = props;
      this.props.names = this.names;
    }.bind(this));
  },

  writing: {
    scss: function() {
      this.fs.copyTpl(
        this.templatePath('scss/component.scss'),
        this.destinationPath(this.folders.src + '/scss/' + this.props.names.kebabcase.plural + '.scss'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('scss/variables/_synthax.scss'),
        this.destinationPath(this.folders.src + '/scss/variables/_synthax.scss'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('scss/variables/_theme.scss'),
        this.destinationPath(this.folders.src + '/scss/variables/_theme.scss'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('scss/mixins/_mixin-example.scss'),
        this.destinationPath(this.folders.src + '/scss/mixins/_mixin-example.scss'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('scss/_statements.scss'),
        this.destinationPath(this.folders.src + '/scss/_statements.scss'),
        { props: this.props }
      );

      this.fs.copy(
        this.templatePath('scss/.scss-lint.yml'),
        this.destinationPath('.scss-lint.yml')
      );
    },

    twig: function() {
      if (this.props.twig) {
        this.fs.copyTpl(
          this.templatePath('twig/component.html.twig'),
          this.destinationPath(this.folders.src + '/twig/' + this.props.names.kebabcase.singular + '.html.twig'),
          { props: this.props }
        );
      }
    },

    javascript: function() {
      if (this.props.javascript) {
        this.fs.copyTpl(
          this.templatePath('javascript/component.js'),
          this.destinationPath(this.folders.src + '/javascript/' + this.props.names.kebabcase.plural + '.js'),
          { props: this.props }
        );

        this.fs.copy(
          this.templatePath('javascript/.jshintrc.yml'),
          this.destinationPath('.jshintrc.yml')
        );
      }
    },

    test: function() {
      if (this.props.twig) {
        this.fs.copyTpl(
          this.templatePath('test/index.html.twig'),
          this.destinationPath(this.folders.test + '/' + this.folders.src + '/index.html.twig'),
          {
            props: this.props,
            folders: this.folders,
          }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('test/index.html'),
          this.destinationPath(this.folders.test + '/' + this.folders.src + '/index.html'),
          {
            props: this.props,
            folders: this.folders,
          }
        );
      }

      this.fs.copyTpl(
        this.templatePath('test/style.scss'),
        this.destinationPath(this.folders.test + '/' + this.folders.src + '/style.scss'),
        {
          props: this.props,
          folders: this.folders,
        }
      );

      this.fs.copyTpl(
        this.templatePath('test/trowel-component.scss'),
        this.destinationPath(this.folders.test + '/' + this.folders.src + '/trowel-' + this.props.names.kebabcase.plural + '.scss'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },

    styleguide: function() {
      if (this.props.twig) {
        this.fs.copyTpl(
          this.templatePath('styleguide/index.html.twig'),
          this.destinationPath(this.folders.styleguide + '/' + this.props.names.kebabcase.plural + '-styleguide.html.twig'),
          {
            props: this.props,
            folders: this.folders,
          }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('styleguide/index.html'),
          this.destinationPath(this.folders.styleguide + '/' + this.props.names.kebabcase.plural + '-styleguide.html'),
          {
            props: this.props,
            folders: this.folders,
          }
        );
      }

      this.fs.copyTpl(
        this.templatePath('styleguide/style.scss'),
        this.destinationPath(this.folders.styleguide + '/' + this.props.names.kebabcase.plural + '-styleguide.scss'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },

    license: function() {
      this.fs.copy(
        this.templatePath('LICENSE'),
        this.destinationPath('LICENSE')
      );
    },

    bower: function() {
      this.fs.copyTpl(
        this.templatePath('bower/bower.json'),
        this.destinationPath('bower.json'),
        {
          props: this.props,
          folders: this.folders,
        }
      );

      this.fs.copyTpl(
        this.templatePath('bower/.bowerrc'),
        this.destinationPath('.bowerrc'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },

    injector: function() {
      this.fs.copyTpl(
        this.templatePath('injector/injector.json'),
        this.destinationPath('injector.json'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },

    readme: function() {
      this.fs.copyTpl(
        this.templatePath('readme/README.md'),
        this.destinationPath('README.md'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },

    editorconfig: function() {
      this.fs.copy(
        this.templatePath('editorconfig/.editorconfig'),
        this.destinationPath('.editorconfig')
      );
    },

    git: function() {
      this.fs.copyTpl(
        this.templatePath('git/.gitignore'),
        this.destinationPath('.gitignore'),
        {
          folders: this.folders
        }
      );
    },

    npm: function() {
      this.fs.copyTpl(
        this.templatePath('npm/package.json'),
        this.destinationPath('package.json'),
        {
          props: this.props,
          folders: this.folders,
        }
      );

      this.fs.copy(
        this.templatePath('npm/.npmignore'),
        this.destinationPath('.npmignore')
      );
    },

    sache: function() {
      this.fs.copyTpl(
        this.templatePath('sache/sache.json'),
        this.destinationPath('sache.json'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },

    gulp: function() {
      this.fs.copyTpl(
        this.templatePath('gulp/gulpfile.babel.js'),
        this.destinationPath('gulpfile.babel.js'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },
  },

  install: function () {
    var npmDevDependencies = [
      'gulp',
      'gulp-size',
      'gulp-load-plugins',
      'gulp-prettify',
      'run-sequence',
      'browser-sync',
      'gulp-notify',
      'gulp-sourcemaps',
      'gulp-sass',
      'gulp-autoprefixer',
      'gulp-cssmin',
      'gulp-rename',
      'babel',
      'babel-cli',
      'babel-core',
      'babel-loader',
      'babel-preset-es2015',
    ];

    var bowerDependencies = [
      'trowel-core',
      'sassy-maps'
    ];

    if (this.props.twig) {
      npmDevDependencies.push(
        'gulp-twig',
        'gulp-ext-replace'
      );
    }

    if (!this.options.noinstall) {
      this.npmInstall(['trowel-core'], { 'save': true }, function() {
        this.npmInstall(npmDevDependencies, { 'saveDev': true }, function() {
          this.runInstall('yarn', null, function() {
            this.bowerInstall(['trowel-core'], { 'save': true });
          }.bind(this));
        }.bind(this));
      }.bind(this));
    }
  }
});
