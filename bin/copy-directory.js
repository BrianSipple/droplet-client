#!/usr/bin/env node

/**
 * COPY DIRECTORY
 *
 * Usage:
 * node <path-to-this-file> <sourcePathOfDirectory> <destPathForFilesInDirectory>
 *
 *
 * NOTE: This binary relies on the `wrench` package. If using it as a postinstall hook
 * in your project, please make sure that you have `wrench in your `devDependencies`
 * hash:
 *
 *      `npm install --save-dev wrench`
 */

'use strict';

var
    path = require('path'),
    fs = require('fs'),
    wrench = require('wrench'),
    args = process.argv.slice(2, 4),

    // set the root directory from which this executable will be called
    rootDir = path.join(__dirname, '../'),

    // Wrench options: https://github.com/ryanmcgrath/wrench-js
    OPTIONS = {
        forceDelete: true
    },

    flags = getFlagOpts();


if (args.length === 2) {

    var
        sourcePath = path.join(rootDir, args[0]),
        destPath = path.join(rootDir, args[1]),
        destDirPathParts = destPath.split(path.sep);

    makeDirsSafely(destDirPathParts);

    var
        isSourcePathADirectory = fs.lstatSync(sourcePath).isDirectory(),
        isDestPathADirectory = fs.lstatSync(destPath).isDirectory();

    if (isSourcePathADirectory && isDestPathADirectory) {
        copyDirectory(sourcePath, destPath);

    } else {
        console.warn('Paths provided to `copy` don\'t match in structure (file or directory)');
    }
} else {
    console.warn('\
        `copyDir` requires a first argument for <sourcePath> ' +
        'and 2nd argument for <destPath>. Num args provided: ' + args.length
    );
}


function getFlagOpts() {

    var additionalArgs = process.argv.slice(4),
        res = {};

    if (additionalArgs && additionalArgs.length) {

        var keyVal;

        additionalArgs.map((flagString) => {
            keyVal = flagString.replace(/^--/, '').split('=');
            res[keyVal[0]] = keyVal[1];
        });
    }
    return res;
}


/**
 * Recursively make directories for each directory part of the path (if they don't already exist)
 */
function makeDirsSafely(dirPathParts) {
    for (var i = 1; i < destDirPathParts.length; i++) {
        makeDirSafely(path.sep + path.join.apply(null, destDirPathParts.slice(0, i)));
    }
}


/**
 * Make a new directory if it doesn't exist. Ignore the
 * `EEXIST` message that will be thrown if it does
 */
function makeDirSafely(dirPath) {

    try {
        fs.mkdirSync(dirPath);
    } catch (e) {
        if (e.code !== 'EEXIST') throw e;
    }
}


function copyDirectory (sourcePath, destPath) {
    if (!!flags.async) {
        wrench.copyDirRecursive(sourcePath, destPath, OPTIONS);

    } else {
        wrench.copyDirSyncRecursive(sourcePath, destPath, OPTIONS);
    }
}
