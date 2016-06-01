'use strict';

const gulp = require('gulp');
const path = require('path');
const requireDir = require('require-dir');
const notify = require('gulp-notify');
const gulpUtil = require('gulp-util');
const util = require('util');


/*
* gulpfile.js
* ===========
* Rather than manage one giant configuration file responsible
* for creating multiple tasks, each task has been broken out into
* its own file in the 'gulp' folder. Any files in that directory get
*  automatically required below.
*
* To add a new task, simply add a new task file in that directory.
*/

// Global loggging helper
global.log = function log (msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                gulpUtil.log(gulpUtil.colors.blue(msg[item]));
            }
        }
    } else {
        gulpUtil.log(gulpUtil.colors.blue(msg));
    }
};


/**
 * stream error handler -- pass this to gulp plumber like: `.pipe(plumber({errorHandler: global.gulpErrorHandler}))`
 */
global.gulpErrorHandler = function gulpErrorHandler (error, data) {
    data = data || {};

    const notifyOpts = {
        title: data.title || 'Gulp Error',
        message: data.message || 'Check your console',
        sound: 'Sosumi'
    };

    // notify.onError(util.inspect(error))(error);  // If we're getting cryptic errors, try this line temporarily
    notify.onError(notifyOpts)(error);
    log(error.stack);
    this.emit('end');
};

// The gulpfile config path is something we'll want to make
// global to the entire process.
global.gulpConfigPath = path.join(__dirname, 'gulpfile.config.js');

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', { recurse: false });

gulp.task('default', ['build:dist']);
