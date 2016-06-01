const

  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  size = require('gulp-size'),
  postcss = require('gulp-postcss'),
  rename = require('gulp-rename'),
  sourcemaps = require('gulp-sourcemaps'),
  config = require(gulpConfigPath)(),
  opts = config.opts.postcss,
  paths = config.paths,

  // NOTE: Order is important here. We're essentially creating our own futuristic CSS Parser!
  processors = [

    require('postcss-import')(),
    require('postcss-nested')(),

    // make sure `:focus` psuedoclasses are included in `:hover` style rules (Why?... http://www.456bereastreet.com/archive/201004/whenever_you_use_hover_also_use_focus/)
    require('postcss-focus')(),
    //

    // enable syntactic sugar for quantity-queries (http://www.smashingmagazine.com/2015/07/quantity-ordering-with-css/)
    // require('postcss-quantity-queries')(),


    // Custom media queries with calc'd variables (order defined here: https://github.com/WolfgangKluge/postcss-media-variables#usage)
    require('postcss-media-variables')(),
    require('postcss-css-variables')(),
    require('postcss-custom-media')(),
    require('postcss-custom-properties')(),
    require('postcss-calc')(),
    require('postcss-media-variables')(),


    // // enable future CSS features nowz
    require('postcss-cssnext')(),

    // // enable SASS-y syntax support
    // require('precss')(opts.precss), // TODO: Clarify hunch that leaving out options defaults to using all features

    // back-compat ftw
    require('autoprefixer')(opts.autoprefixer),
    require('css-mqpacker')(),


    // minify all the things
    //require('cssnano')(opts.cssNano),
    require('csswring')(opts.cssWring),

    // report all the things
    require('postcss-reporter')()

  ];


  gulp.task('build:temp', ['clean:temp'], function () {
    log('Building for temporary local serving');
    return gulp
      .src(paths.mainSrcCSSFile)
      .pipe(sourcemaps.init())
      .pipe(plumber({errorHandler: global.gulpErrorHandler}))
      .pipe(postcss(processors))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.tempDir));
  });


  gulp.task('build:dist', ['clean:dist'], function () {
    log('Building for distribution');
    return gulp
      .src(paths.mainSrcCSSFile)
      .pipe(plumber({errorHandler: global.gulpErrorHandler}))
      .pipe(postcss(processors))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(size({ showFiles: true }))  // compute raw size
      .pipe(size({ gzip: true, showFiles: true }))  // compute size gzipped
      .pipe(gulp.dest(paths.distDir));
  });
