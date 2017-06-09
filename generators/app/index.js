/*jshint -W097 */
'use strict';
var Generator = require('yeoman-generator');
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

module.exports = class extends Generator {
  initializing() {
    this.option('noinstall');

    // Have Yeoman greet the user.
    this.log(yosay(
      'It\'s time to make some ' + chalk.red('trowel') + '!'
    ));

    this.folders = {
      src: 'src',
      dest: 'dest',
      test: 'test',
    };
  }

  prompting() {
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
        message: 'What\'s the name of the library for the package managers ?',
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

      {
        type: 'list',
        name: 'dependencyManager',
        required: true,
        choices: ['npm', 'yarn'],
        message: 'Which dependency manager would you use for fecthing dev dependencies ?',
        when: function() {
          return !this.options.noinstall;
        }.bind(this),
      },
    ]).then(function (props) {
      this.props = props;
      this.props.names = this.names;
    }.bind(this));
  }

  writing() {
    // scss
    this.fs.copyTpl(
      this.templatePath('scss/component.scss'),
      this.destinationPath(this.folders.src + '/scss/' + this.props.names.kebabcase.plural + '.scss'),
      { props: this.props }
    );

    ['enables', 'syntaxes', 'trowel-variables', 'mixin-example'].forEach(function(util) {
      this.fs.copyTpl(
        this.templatePath('scss/utils/_' + util + '.scss'),
        this.destinationPath(this.folders.src + '/scss/utils/_' + util + '.scss'),
        { props: this.props }
      );
    }.bind(this));

    this.fs.copy(
      this.templatePath('scss/.scss-lint.yml'),
      this.destinationPath('.scss-lint.yml')
    );


    // twig
    if (this.props.twig) {
      this.fs.copyTpl(
        this.templatePath('twig/component.html.twig'),
        this.destinationPath(this.folders.src + '/twig/' + this.props.names.kebabcase.singular + '.html.twig'),
        { props: this.props }
      );
    }


    // javascript
    if (this.props.javascript) {
      this.fs.copyTpl(
        this.templatePath('javascript/component.js'),
        this.destinationPath(this.folders.src + '/javascript/' + this.props.names.kebabcase.plural + '.js'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('javascript/webpack.config.js'),
        this.destinationPath('webpack.config.js'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    }


    // test
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


    // license
    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE')
    );


    // bower
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


    // doc
    this.fs.copyTpl(
      this.templatePath('doc/README.md'),
      this.destinationPath('README.md'),
      {
        props: this.props,
        folders: this.folders,
      }
    );

    this.fs.copyTpl(
      this.templatePath('doc/contributing.md'),
      this.destinationPath('CONTRIBUTING.md'),
      {
        props: this.props,
        folders: this.folders,
      }
    );


    // editorconfig
    this.fs.copy(
      this.templatePath('editorconfig/.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    // git
    this.fs.copyTpl(
      this.templatePath('git/.gitignore'),
      this.destinationPath('.gitignore'),
      {
        folders: this.folders
      }
    );


    // npm
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


    // sache
    this.fs.copyTpl(
      this.templatePath('sache/sache.json'),
      this.destinationPath('sache.json'),
      {
        props: this.props,
        folders: this.folders,
      }
    );

    // gulp
    this.fs.copyTpl(
      this.templatePath('gulp/gulpfile.babel.js'),
      this.destinationPath('gulpfile.babel.js'),
      {
        props: this.props,
        folders: this.folders,
      }
    );

    this.fs.copyTpl(
      this.templatePath('gulp/.babelrc'),
      this.destinationPath('.babelrc'),
      {
        props: this.props,
        folders: this.folders,
      }
    );
  }

  install() {
    const nodeDeps = {
      'save': [
        'trowel-core',
      ],
      'saveDev': [
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
      ],
    };

    const bowerDeps = [
      'trowel-core',
    ];

    if (this.props.twig) {
      nodeDeps.saveDev.push(
        'gulp-twig',
        'gulp-ext-replace'
      );
    }

    if (this.props.javascript) {
      nodeDeps.saveDev.push(
        'babel-plugin-add-module-exports',
        'babel-preset-es2015',
        'webpack',
        'yargs'
      );
    }


    if (!this.options.noinstall) {
      this[`${this.props.dependencyManager}Install`](nodeDeps.saveDev, { 'saveDev': true });
      this[`${this.props.dependencyManager}Install`](nodeDeps.save, { 'save': true });
      this[`bowerInstall`](bowerDeps, { 'save': true });
    }
  }
};
