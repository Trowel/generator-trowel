let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let runSequence = require('run-sequence');
let browserSync = require('browser-sync');
let reload = browserSync.reload;

// Template
// ========

gulp.task('template_test', () => {
    <% if (props.twig) { %>return gulp.src('<%= folders.test %>/<%= folders.src %>/index.html.twig')
        .pipe($.twig())
        .pipe($.extReplace('.html', '.html.html'))
        .pipe($.prettify({ indent_size: 2 }))
        .pipe(gulp.dest('<%= folders.test %>/<%= folders.dest %>'));
    <% } else { %>return gulp.src('<%= folders.test %>/<%= folders.src %>/index.html')
        .pipe($.prettify({ indent_size: 2 }))
        .pipe(gulp.dest('<%= folders.test %>/<%= folders.dest %>'));<% } %>
});

let report_error = error => {
  $.notify({
    title: 'An error occured with a Gulp task',
    message: 'Check you terminal for more informations'
  }).write(error);

  console.log(error.toString());
  this.emit('end');
};


// Style
// =====

let scssCompilation = (src, dest) => {
    return gulp.src(src)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            precision: 6,
            indentWidth: 4,
        }))
        .on('error', report_error)
        .pipe($.autoprefixer({
            browsers: [
                'ie >= 10',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10'
            ]
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest));
}

gulp.task('style_test', () => scssCompilation('./<%= folders.test %>/<%= folders.src %>/style.scss', './<%= folders.test %>/<%= folders.dest %>'));
gulp.task('style_dest', () => scssCompilation('./<%= folders.test %>/<%= folders.src %>/trowel-drops.scss', './<%= folders.dest %>/css'));
gulp.task('style', ['style_test', 'style_dest']);


<% if (props.javascript) { %>// Javascript
// ==========

let jsTranspilation = (src, dest) => {
    return gulp.src(src)
        .pipe($.sourcemaps.init())
        .pipe($.babel({
            presets: ['es2015']
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(dest));
}

gulp.task('script_test', () => jsTranspilation('./<%= folders.src %>/javascript/<%= props.names.kebabcase.plural %>.js', './test/<%= folders.dest %>/javascript'));
gulp.task('script_dest', () => jsTranspilation('./<%= folders.src %>/javascript/<%= props.names.kebabcase.plural %>.js', './<%= folders.dest %>/javascript'));
gulp.task('script', ['script_test', 'script_dest']);

<% } %>
gulp.task('default', ['style', 'template_test'<% if (props.javascript) { %>, 'script'<% } %>]);
gulp.task('watch', ['default'], () => {
  browserSync({
    notify: false,
    logPrefix: 'Trowel <%= props.names.capitalcase.plural %>',
    server: ['<%= folders.test %>/<%= folders.dest %>']
  });

  gulp.watch('./**/*.scss', ['style', reload]);
  <% if (props.twig) { %>gulp.watch(['<%= folders.test %>/<%= folders.src %>/**/*.html.twig', '<%= folders.src %>/twig/**/*.html.twig'], ['template_test', reload]);<% } else { %>gulp.watch(['<%= folders.test %>/<%= folders.src %>/**/*.html'], ['template_test', reload]);<% } %>
  <% if (props.javascript) { %>gulp.watch('./<%= folders.src %>/javascript/**/*', ['script', reload]);<% } %>
});
