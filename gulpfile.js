// Global variables
var $             = require('gulp-load-plugins')(),
    gulp          = require('gulp'),
    autoprefixer  = require('autoprefixer'),
    browsersync   = require('browser-sync'),
    del           = require('del'),
    _             = require('underscore');

// Asset builder
var manifest = require('asset-builder')('./app/manifest.json');

// Vendor css/js files from bower
gulp.task('vendor-js', function(){
  manifest.forEachDependency('js', function (dep){
    return gulp.src(dep.globs)
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('app/'));
  });
});

gulp.task('vendor-css', function(){
  var globs = manifest.globs.bower;
  var cssDependencies = _.filter(globs, function (glob){
    return glob.split('.').pop() === 'css' || glob.split('.').pop() === 'scss';
  });

  return gulp.src(cssDependencies)
    .pipe($.sass())
    .pipe($.concat('vendor.css'))
    .pipe($.cssnano())
    .pipe(gulp.dest('app/'));
});

// main js and main css
gulp.task('script', function(){
  return gulp.src('app/js/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('app/'));
});

var processor = [autoprefixer({ 
  browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4'] 
  })
];

gulp.task('style', function(){
  return gulp.src('app/styles/main.scss')
    .pipe($.sass())
    .pipe($.postcss(processor))
    .pipe($.cssnano())
    .pipe(gulp.dest('app/'));
});

// Tasks

// Watch

// Default