/*jshint -W097 */
'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var validateString = function(input) {
  if (typeof input !== 'string') {
    this.log(chalk.red('You must pass a valid string valid !'));
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
            this.log(chalk.red('You must pass a valid string valid !'));
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
          return 'https://github.com/Trowel/' + answers.name;
        },
        validate: function(input) {
          if (typeof input !== 'string' || input.length === 0) {
            this.log(chalk.red('You must pass a valid string valid !'));
            return false;
          }
          return true;
        }.bind(this),
        required: true
      },

      {
        type: 'confirm',
        name: 'scss',
        required: true,
        default: true,
        message: function(answers) {
          return 'Do you want to use scss for your ' + answers.name + ' brick ? (located at `' + this.folders.src + '/scss/' + answers.name + '.scss`)';
        }.bind(this),
      },

      {
        type: 'confirm',
        name: 'css',
        required: true,
        default: true,
        message: function(answers) {
          return 'So maybe you would rather use vanilla css for your ' + answers.name + ' brick ? (located at `' + this.folders.src + '/scss/' + answers.name + '.css`)';
        }.bind(this),
        when: function(answers) {
          return !answers.scss;
        }.bind(this),
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
        name: 'js',
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
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
