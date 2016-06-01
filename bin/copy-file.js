#!/usr/bin/env node

'use strict';

/**
 * COPY FILE
 *
 * Usage:
 * node <path-to-this-file> <sourcePath> <destPath>
 */

var
    path = require('path'),
    fs = require('fs'),
    args = process.argv.slice(2),

    // set the root directory from which this executable will be called
    rootDir = path.join(__dirname, '../');

if (args.length === 2) {

    var
        sourcePath = path.join(rootDir, args[0]),
        destPath = path.join(rootDir, args[1]),
        destDirPathParts = destPath.split(path.sep),

        isSourcePathAFile = fs.lstatSync(sourcePath).isFile();

    if (isSourcePathAFile) {

        // Recursively make directories for each directory part of the path (if they don't already exist)
        for (var i = 1; i < destDirPathParts.length; i++) {
            makeDirSafely(path.sep + path.join.apply(null, destDirPathParts.slice(0, i)));
        }

        copyFile(sourcePath, destPath);

    } else {
        console.warn('The provided source path is not an an existing file');
    }

} else {
    console.warn('\
        `copyFile` requires a first argument for <sourceFile> ' +
        'and 2nd argument for <destFile>. Num args provided: ' + args.length
    );
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


function copyFile (sourcePath, destPath) {
    fs.createReadStream(sourcePath).pipe(fs.createWriteStream(destPath));
}
