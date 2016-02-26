// Global variables
var $             = require('gulp-load-plugins')(),
    gulp          = require('gulp'),
    autoprefixer  = require('autoprefixer'),
    browsersync   = require('browser-sync').create(),
    del           = require('del'),
    _             = require('underscore'),
    connect       = require('gulp-connect');

// Asset builder
var manifest = require('asset-builder')('./app/manifest.json');

// Vendor js files from bower
gulp.task('vendor-js', function(){
  manifest.forEachDependency('js', function (dep){
    return gulp.src(dep.globs)
    .pipe($.concat('vendor.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('app/'))
    .pipe(browsersync.reload({
      stream: true
    }));
  });
});

// Main js
gulp.task('script', function(){
  return gulp.src('app/js/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'))
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('app/'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

// JS Task
gulp.task('jsTask', ['script', 'vendor-js']);

// Vendor css files from bower
gulp.task('vendor-css', function(){
  var globs = manifest.globs.bower;
  var cssDependencies = _.filter(globs, function (glob){
    return glob.split('.').pop() === 'css' || glob.split('.').pop() === 'scss';
  });

  return gulp.src(cssDependencies)
    .pipe($.sass())
    .pipe($.concat('vendor.css'))
    .pipe($.cssnano())
    .pipe(gulp.dest('app/'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

// Main css
var processor = [autoprefixer({ 
  browsers: ['> 3%', 'last 2 versions', 'ie 9', 'ios 6', 'android 4'] 
  })
];

gulp.task('style', function(){
  return gulp.src('app/styles/main.scss')
    .pipe($.sass())
    .pipe($.postcss(processor))
    .pipe($.cssnano())
    .pipe(gulp.dest('app/'))
    .pipe(browsersync.reload({
      stream: true
    }));
});

// CSS Task
gulp.task('cssTask', ['style', 'vendor-css']);

// Html Task
gulp.task('htmlTask', function () {
  gulp.src('app/*.html')
    .pipe(browsersync.reload({
      stream: true
    }));
});

// Font Task -- only for dist
gulp.task('fontTask', function(){
  return gulp.src('app/fonts/**/*.+(ttf|ttc|otf|woff|eot)')
  .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'));
});

// Image Task -- only for dist
gulp.task('imageTask', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe($.cache($.imagemin({
        interlaced: true
      })
    ))
    .pipe(gulp.dest('dist/images'));
});

// Clean Task
gulp.task('clean', function(){
  del(['app/main.css', 'app/main.js','app/vendor.css', 'app/vendor.js'])
  .then( paths => {
      // console.log('Deleted files and folders:\n', paths.join('\n'));
      console.log('cleaned files');
  });
});

// Build Task -- no need to compile to build folder due to requirement
gulp.task('build', ['cssTask', 'jsTask']);

// browsersync
gulp.task('browsersync',['build'], function(){
  browsersync.init({
    server: {
      baseDir: 'app'
    },
  })
});

// Watch
gulp.task('watch', ['browsersync'], function(){
  gulp.watch('app/styles/**/*.scss', ['cssTask']);
  gulp.watch('app/js/**/*.js', ['jsTask']);
  gulp.watch('app/*.html', ['htmlTask']);
  gulp.watch('app/**/*').on('change', function(file){
    $.livereload.changed(file.path);
  });
});

// Serve
gulp.task('serve', ['watch'], function() {
  connect.server({
    root: 'app/',
    livereload: true,
    port: 3000,
    open: {
      browser: 'Google Chrome',
      url: 'http://localhost:3000'
    }
  });
});

// Default
gulp.task('default', ['clean'], function(){
  gulp.start(['serve']);
});