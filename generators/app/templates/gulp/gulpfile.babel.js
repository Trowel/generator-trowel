'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import runSequence from 'run-sequence';
import browserSync from 'browser-sync';
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

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

const report_error = error => {
  $.notify({
    title: 'An error occured with a Gulp task',
    message: 'Check you terminal for more informations'
  }).write(error);

  console.log(error.toString());
  this.emit('end');
};


// Style
// =====

const scssCompilation = (src, dest) => {
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
gulp.task('style', function() {
    return gulp.src('./<%= folders.test %>/<%= folders.src %>/style.scss')
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
        .pipe(gulp.dest('./<%= folders.test %>/<%= folders.dest %>'))
        .pipe($.rename({ basename: '<%= props.names.kebabcase.plural %>' }))
        .pipe(gulp.dest('./<%= folders.dest %>/css'))
        .pipe($.cssmin())
        .pipe($.rename({ suffix: ".min" }))
        .pipe(gulp.dest('./<%= folders.dest %>/css'))
    ;
});


gulp.task('default', ['style', 'template_test']);
gulp.task('watch', ['default'], () => {
  browserSync({
    notify: false,
    logPrefix: 'Trowel <%= props.names.capitalcase.plural %>',
    server: ['<%= folders.test %>/<%= folders.dest %>']
  });

  gulp.watch('./**/*.scss', ['style', reload]);
  <% if (props.twig) { %>gulp.watch(['<%= folders.test %>/<%= folders.src %>/**/*.html.twig', '<%= folders.src %>/twig/**/*.html.twig'], ['template_test', reload]);<% } else { %>gulp.watch(['<%= folders.test %>/<%= folders.src %>/**/*.html'], ['template_test', reload]);<% } %>
});
