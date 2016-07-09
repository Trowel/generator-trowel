var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('template_test', function() {
<% if (props.twig) { %>
  return gulp.src('<%= folders.test %>/<%= folders.src %>/index.html.twig')
    .pipe($.twig())
    .pipe($.extReplace('.html', '.html.html'))
    .pipe($.prettify({ indent_size: 2 }))
    .pipe(gulp.dest('<%= folders.test %>/<%= folders.dest %>'));
<% } else { %>
  return gulp.src('<%= folders.test %>/<%= folders.src %>/index.html')
    .pipe($.prettify({ indent_size: 2 }))
    .pipe(gulp.dest('<%= folders.test %>/<%= folders.dest %>'));
<% } %>
});


<% if (props.scss) { %>
AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
var report_error = function(error) {
  $.notify({
    title: 'An error occured with a Gulp task',
    message: 'Check you terminal for more informations'
  }).write(error);

  console.log(error.toString());
  this.emit('end');
};

gulp.task('scss', function () {
    return gulp.src('<%= folders.src %>/scss/<%= props.name %>.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        precision: 6,
        outputStyle: 'expanded',
        sourceComments: true,
        indentWidth: 4,
    }))
    .on('error', report_error)
    .pipe($.autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('<%= folders.dest %>/css'))
    .pipe($.size({title: 'css'}))
    .pipe($.cssmin())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest('<%= folders.dest %>/css'))
    .pipe($.size({title: 'css minified'}))
});

gulp.task('scss_test', function () {
    return gulp.src('<%= folders.test %>/<%= folders.src %>/style.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        precision: 6,
        outputStyle: 'expanded',
        sourceComments: true,
        indentWidth: 4,
    }))
    .on('error', report_error)
    .pipe($.autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('<%= folders.test %>/<%= folders.dest %>'));
});
<% } %>

test = [
  <% if (props.scss) { %>'scss_test',<% } %>
  'template_test',
];

gulp.task('test', test);
gulp.task('test_watch', prewatch, function() {
  browserSync({
    notify: false,
    logPrefix: '<%= props.name %>',
    server: ['<%= folders.test %>/<%= folders.dest %>']
  });

  <% if (props.scss) { %>gulp.watch(['<%= folders.src %>/scss/**/*.scss', '<%= folders.test %>/<%= folders.src %>/**/*.scss'], ['scss_test', reload]);<% } %>
  <% if (props.twig) { %>gulp.watch(['<%= folders.test %>/<%= folders.src %>/**/*.html.twig', '<%= folders.src %>/twig/**/*.html.twig'], ['template_test', reload]);<% } else { %>gulp.watch(['<%= folders.test %>/<%= folders.src %>/**/*.html'], ['template_test', reload]);<% } %>
});

build = [
  <% if (props.scss) { %>'scss',<% } %>
];
gulp.task('build', build);
