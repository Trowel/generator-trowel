/*jshint -W097 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

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

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your trowel brick ?',
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
      },

      {
        type: 'input',
        name: 'description',
        message: 'What is the description of your brick ?',
        required: true,
        default: function(answers) {
          let name_capitalized = answers.name.charAt(0).toUpperCase() + answers.name.slice(1);
          return 'The official Trowel Component for ' + name_capitalized;
        },
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
          return 'https://github.com/FriendsOfTrowel/' + answers.name;
        },
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
        default: true,
        message: function(answers) {
          return 'And what about some twig template ? (located at `' + this.folders.src + '/twig/' + answers.name + '.html.twig`)';
        }.bind(this),
      },

      {
        type: 'confirm',
        name: 'javascript',
        required: true,
        default: false,
        message: function(answers) {
          return 'Some javascript file with it ? (located at `' + this.folders.src + '/javascript/' + answers.name + '.js`)';
        }.bind(this),
      },
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;

      // For sass code with pre built classes
      let is_name_plural = props.name.slice(-1) === 's';
      this.props.name_singular = is_name_plural ? props.name.slice(0, props.name.length - 1) : props.name;
    }.bind(this));
  },

  writing: {
    scss: function() {
      this.fs.copyTpl(
        this.templatePath('scss/brick.scss'),
        this.destinationPath(this.folders.src + '/scss/' + this.props.name + '.scss'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('scss/variables/_synthax.scss'),
        this.destinationPath(this.folders.src + '/scss/variables/_synthax.scss'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('scss/variables/_theme-blank.scss'),
        this.destinationPath(this.folders.src + '/scss/variables/_theme-blank.scss'),
        { props: this.props }
      );

      this.fs.copyTpl(
        this.templatePath('scss/variables/_theme-trowel.scss'),
        this.destinationPath(this.folders.src + '/scss/variables/_theme-trowel.scss'),
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
          this.templatePath('twig/brick.html.twig'),
          this.destinationPath(this.folders.src + '/twig/' + this.props.name + '.html.twig'),
          { props: this.props }
        );
      }
    },

    javascript: function() {
      if (this.props.javascript) {
        this.fs.copyTpl(
          this.templatePath('javascript/brick.js'),
          this.destinationPath(this.folders.src + '/javascript/' + this.props.name + '.js'),
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
    },

    styleguide: function() {
      if (this.props.twig) {
        this.fs.copyTpl(
          this.templatePath('styleguide/index.html.twig'),
          this.destinationPath(this.folders.styleguide + '/' + this.props.name + '-styleguide.html.twig'),
          {
            props: this.props,
            folders: this.folders,
          }
        );
      } else {
        this.fs.copyTpl(
          this.templatePath('styleguide/index.html'),
          this.destinationPath(this.folders.styleguide + '/' + this.props.name + '-styleguide.html'),
          {
            props: this.props,
            folders: this.folders,
          }
        );
      }

      this.fs.copyTpl(
        this.templatePath('styleguide/style.scss'),
        this.destinationPath(this.folders.styleguide + '/' + this.props.name + '-styleguide.scss'),
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
        this.templatePath('gulp/gulpfile.js'),
        this.destinationPath('gulpfile.js'),
        {
          props: this.props,
          folders: this.folders,
        }
      );
    },
  },

  install: function () {
    var npmDependencies = [
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
      'gulp-rename'
    ];

    var bowerDependencies = [
      'trowel-core',
      'sassy-maps'
    ];

    if (this.props.twig) {
      npmDependencies.push(
        'gulp-twig',
        'gulp-ext-replace'
      );
    }

    this.npmInstall(npmDependencies, { 'saveDev': true }, function() {
      this.runInstall('yarn');
    }.bind(this));
    this.bowerInstall(bowerDependencies, { 'save': true });
  }
});
