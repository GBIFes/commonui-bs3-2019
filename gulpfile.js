const gulp = require('gulp');

const gulpSass = require('gulp-sass');

const csso = require('gulp-csso');

const rename = require('gulp-rename');

const replace = require('gulp-replace');

const uglify = require('gulp-uglify');

const babel = require('gulp-babel');

const fs = require('fs');

const del = require('del');

const gulpTraceurCmdline = require('gulp-traceur-cmdline');

const concat = require('gulp-concat');

const { src, dest } = gulp;

const paths = {
  styles: {
    boostrap: 'assets/scss/bootstrap.scss',
    'boostrap-ala': 'assets/scss/bootstrap-ala.scss',
    'font-awesome': 'assets/scss/font-awesome.scss',
    src: '**/*.scss',
    dest: 'build/css/',
    jqueryui: 'assets/vendor/jquery-ui/autocomplete.css'
  },
  images: {
    jqueryui: 'assets/vendor/jquery-ui/images/**',
    jqueryuidest: 'build/css/images/'
  },
  imagesothers: {
    src: ['assets/images/**'],
    dest: 'build/images/'
  },
  assets: {
    src: ['assets/**', '!assets/vendor/**', '!assets/scss/**'],
    dest: 'build/'
  },
  dependencycss: {
    src: ['assets/css/*.css'],
    dest: 'build/css/'
  },
  dependencyjs: {
    src: 'assets/js/*.js',
    dest: 'build/js/'
  },
  html: {
    src: ['banner.html', 'footer.html', 'head.html', 'testTemplate.html', 'index_gbif_es.html'],
    dest: 'build/'
  },
  font: {
    src: ['bootstrap-sass/assets/fonts/bootstrap/*.*', 'ala-wordpress-2019/web/app/themes/understrap/fonts/*', 'ala-wordpress-2019/web/app/themes/pvtl/fonts/*', 'assets/fonts/**'],
    dest: 'build/fonts/'
  },
  js: {
    src: [
      'node_modules/domurl/url.js',
      'node_modules/js-cookie/src/js.cookie.js',
      'assets/js/*.js'
    ],
    dest: 'build/js/',
    jquery: 'assets/vendor/jquery/jquery-3.4.1.js',
    'jquery-migration': 'assets/vendor/jquery/jquery-migrate-3.0.1.js',
    bootstrap: 'assets/vendor/bootstrap/bootstrap.js',
    jqueryui: 'assets/vendor/jquery-ui/autocomplete.js'
  }
};

/**
 * Possible values
 * 'ala'
 * 'living-atlas'
 * @type {string}
 */

const output = 'living-atlas';

/**
 * Address of the node server
 * Check readme for more details
 * @type {string}
 */

const localserver = 'http://localhost:8099';

/**
 * Bootstrap output is dependent on value of @link{output} variable.
 * If 'ala' is chosen, bootstrap.css will have custom ala styles.
 * If 'living-atlas' is chosen, bootstrap.css will be standard bootstrap styling.
 * @returns {stream}
 */
function bootstrapCSS() {
  switch (output) {
    case 'ala':
      return src(paths.styles['boostrap-ala'])
        .pipe(gulpSass({ precision: 9 }))
        .pipe(rename('bootstrap.css'))
        .pipe(dest(paths.styles.dest))
        .pipe(csso({ restructure: false }))
        .pipe(rename('bootstrap.min.css'))
        .pipe(dest(paths.styles.dest));
    case 'living-atlas':
      return src(paths.styles.boostrap)
        .pipe(gulpSass({ precision: 9 }))
        .pipe(rename('bootstrap.css'))
        .pipe(dest(paths.styles.dest))
        .pipe(csso({ restructure: false }))
        .pipe(rename('bootstrap.min.css'))
        .pipe(dest(paths.styles.dest));
  }
}

function autocompleteCSS() {
  return src(paths.styles.jqueryui)
    .pipe(rename('autocomplete.css'))
    .pipe(dest(paths.styles.dest))
    .pipe(csso({ restructure: false }))
    .pipe(rename('autocomplete.min.css'))
    .pipe(dest(paths.styles.dest));
}

function fontawesome() {
  return src(paths.styles['font-awesome'])
    .pipe(gulpSass({ precision: 9 }))
    .pipe(rename('font-awesome.css'))
    .pipe(dest(paths.styles.dest))
    .pipe(csso({ restructure: false }))
    .pipe(rename('font-awesome.min.css'))
    .pipe(dest(paths.styles.dest));
}

function otherCSSFiles() {
  return src(paths.dependencycss.src)
    .pipe(dest(paths.dependencycss.dest))
    .pipe(csso({ restructure: false }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(paths.dependencycss.dest));
}

function autocompleteImages() {
  return src(paths.images.jqueryui)
    .pipe(dest(paths.images.jqueryuidest));
}

function otherImages() {
  return src(paths.imagesothers.src)
    .pipe(dest(paths.imagesothers.dest));
}

const css = gulp.parallel(bootstrapCSS, fontawesome, autocompleteImages, autocompleteCSS, otherCSSFiles);

const images = gulp.parallel(otherImages);

function testHTMLPage() {
  const header = fs.readFileSync('banner.html');
  const footer = fs.readFileSync('footer.html');
  const indexEs = fs.readFileSync('index_gbif_es.html');
  return src('testTemplate.html')
    .pipe(replace('HEADER_HERE', header))
    .pipe(replace('FOOTER_HERE', footer))
    .pipe(replace('INDEX_ES', indexEs))
    .pipe(replace(/::containerClass::/g, 'container'))
    .pipe(replace(/::headerFooterServer::/g, localserver))
    .pipe(replace(/::loginStatus::/g, 'signedOut'))
    .pipe(replace(/::loginURL::/g, 'https://auth.gbif.es/cas/login'))
    .pipe(replace(/::searchServer::/g, 'https://especies.gbif.es'))
    .pipe(replace(/::searchPath::/g, '/search'))
    .pipe(rename('testPage.html'))
    .pipe(dest(paths.html.dest));
}

function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest));
}

function font() {
  return src(paths.font.src)
    .pipe(dest(paths.font.dest));
}

function jQuery() {
  return src(paths.js.jquery)
    .pipe(rename('jquery.js'))
    .pipe(dest(paths.js.dest))
    .pipe(uglify({ output: { comments: '/^!/' } }))
    .pipe(rename('jquery.min.js'))
    .pipe(dest(paths.js.dest));
}

function jqueryMigration() {
  return src(paths.js['jquery-migration'])
    .pipe(rename('jquery-migration.js'))
    .pipe(dest(paths.js.dest))
    .pipe(uglify({ output: { comments: '/^!/' } }))
    .pipe(rename('jquery-migration.min.js'))
    .pipe(dest(paths.js.dest));
}

function bootstrapJS() {
  return src(paths.js.bootstrap)
    .pipe(rename('bootstrap.js'))
    .pipe(dest(paths.js.dest))
    .pipe(uglify({ output: { comments: '/^!/' } }))
    .pipe(rename('bootstrap.min.js'))
    .pipe(dest(paths.js.dest));
}

function autocompleteJS() {
  return src(paths.js.jqueryui)
    .pipe(rename('autocomplete.js'))
    .pipe(dest(paths.js.dest))
    .pipe(uglify({ output: { comments: '/^!/' } }))
    .pipe(rename('autocomplete.min.js'))
    .pipe(dest(paths.js.dest));
}

function otherJsFiles() {
  return src(paths.js.src)
    .pipe(dest(paths.js.dest))
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulpTraceurCmdline({
      modules: 'inline',
      debug   : true  }))
    .pipe(uglify({ output: { comments: '/^!/' } }))
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest(paths.js.dest));
  /* .pipe(concat('all.js')) */
}

const js = gulp.parallel(jQuery, jqueryMigration, bootstrapJS, autocompleteJS, otherJsFiles);

function assetCopy() {
  return src(paths.assets.src)
    .pipe(dest(paths.assets.dest));
}

function watch() {
  gulp.watch(paths.html.src, testHTMLPage);
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.styles.src, css);
  gulp.watch(paths.dependencycss.src, css);
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.imagesothers.src, images);
}

function clean() {
  return del([paths.assets.dest]);
}

const build = gulp.series(clean, assetCopy, gulp.parallel(css, images, testHTMLPage, html, font, js));

exports.watch = watch;
exports.css = css;
exports.images = images;
exports.html = gulp.series([testHTMLPage, html]);
exports.font = font;
exports.js = js;
exports.build = build;
exports.clean = clean;
