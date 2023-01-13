const {
  src,
  dest,
  series,
  watch
} = require( 'gulp' );
const del = require( 'del' );
const rename = require( "gulp-rename" );
const notify = require( 'gulp-notify' );
const browserSync = require( 'browser-sync' ).create();

const sass = require( 'gulp-sass' )( require( 'sass' ) );
const postcss = require( "gulp-postcss" );
const autoprefixer = require( 'autoprefixer' );
const cleanCSS = require( 'gulp-clean-css' );
const csscomb = require( "gulp-csscomb" );

const babel = require( 'gulp-babel' );
const uglify = require( 'gulp-uglify-es' ).default;

const fileInclude = require( 'gulp-file-include' );

const clean = () => {
  return del( [ './app/*' ] )
}

const styles = () => {
  return src( './src/*.scss' )
    .pipe( sass().on( "error", notify.onError() ) )
    .pipe( postcss( [
      autoprefixer( {
        cascade: false,
      } )
    ] ) )
    .pipe( dest( './app/' ) )
    .pipe( browserSync.stream() );
};

const stylesProd = () => {
  return src( './src/style.scss' )
    .pipe( sass().on( "error", notify.onError() ) )
    .pipe( postcss( [
      autoprefixer( {
        cascade: false,
      } )
    ] ) )
    .pipe( csscomb() )
    .pipe( rename( 'just-tabs.min.css' ) )
    .pipe( dest( './dist/' ) )
    .pipe( cleanCSS( {
      level: 2
    } ) )
    .pipe( dest( './dist/' ) )
};

const scripts = () => {
  return src( './src/*.js' )
    .pipe( babel( {
      presets: [ '@babel/env' ]
    } ) )
    .pipe( dest( './app/' ) )
    .pipe( browserSync.stream() );
}

const scriptsProd = () => {
  return src( './src/script.js' )
    .pipe( babel( {
      presets: [ '@babel/env' ]
    } ) )
    .pipe( rename( 'just-tabs.min.js' ) )
    .pipe( uglify().on( "error", notify.onError() ) )
    .pipe( dest( './dist/' ) )
}

const htmlInclude = () => {
  return src( [ './src/*.html' ] )
    .pipe( fileInclude( {
      prefix: '@',
      basepath: '@file'
    } ).on( "error", notify.onError() ) )
    .pipe( dest( './app/' ) )
    .pipe( browserSync.stream() );
}

const watchFiles = () => {
  browserSync.init( {
    server: {
      baseDir: "./app/"
    },
    notify: false,
    ui: false,
  } );

  watch( './src/*.scss', styles );
  watch( './src/*.js', scripts );
  watch( './src/html/**/*.html', htmlInclude );
  watch( './src/*.html', htmlInclude );
}

exports.default = series( clean, htmlInclude, scripts, styles, watchFiles );
exports.update = series( scriptsProd, stylesProd );
