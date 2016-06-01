'use strict';

const
  gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  stylelint = require('stylelint'),
  reporter = require('postcss-reporter'),
  postcss = require('gulp-postcss'),

  config = require(gulpConfigPath)(),
  opts = config.opts.postcss,
  paths = config.paths,

  processors = [
    stylelint(opts.stylelint),
    reporter(opts.reporter)
];

// Lint source CSS using Stylelint
// Rules are defined in config.js
gulp.task('lint', function () {

  return gulp
  .src(paths.srcCSS)
  .pipe(plumber())
  .pipe(postcss(processors));
});
