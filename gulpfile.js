'use strict';

/* Paths */
var path = {
  dist: {
    css: 'assets/css/',
    style: 'assets/css/',
  },
  src: {
    style: 'assets/scss/scss/style.scss',
  }
};

/* Include gulp and plugins */
var gulp = require('gulp'),
    webserver = require('browser-sync'),
    reload = webserver.reload,
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass')(require('sass')),
    sassUnicode = require('gulp-sass-unicode'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    jpegrecompress = require('imagemin-jpeg-recompress'),
    pngquant = require('imagemin-pngquant'),
    del = require('del'),
    fileinclude = require('gulp-file-include'),
    beautify = require('gulp-beautify'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    jsImport = require('gulp-js-import'),
    newer = require('gulp-newer'),
    replace = require('gulp-replace'),
    touch = require('gulp-touch-cmd');
    
/* Server */
var config = {
    server: {
        baseDir: './dist'
    },
    notify: false
};

/* Tasks */

// Start the server
gulp.task('webserver', function () {
    webserver(config);
});

gulp.task('css:dist', function () {
  return gulp.src(path.src.style)
    .pipe(newer(path.dist.style))
    .pipe(plumber())
    //.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sassUnicode())
    .pipe(autoprefixer())
    .pipe(beautify.css({ indent_size: 2, preserve_newlines: false }))
    .pipe(cleanCSS())
    //.pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dist.style))
    .pipe(touch())
    .on('end', () => { reload(); });
});


// Clear cache
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// Assembly Dist
gulp.task('build:dist',
      gulp.parallel(
      'css:dist',
      )
);

// Dist
gulp.task('build:dist', gulp.series(
    'build:dist'
));

// Default tasks
gulp.task('default', gulp.series(
    'build:dist',
    ));
