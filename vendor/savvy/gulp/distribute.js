'use strict';

const
	gulp = require('gulp'),
	args = require('yargs').argv,
	bump = require('gulp-bump'),
	git = require('gulp-git'),
	filter = require('gulp-filter'),
	tagVersion = require('gulp-tag-version'),
  StreamTransform = require('stream').Transform,

	config = require(global.gulpConfigPath)(),
	paths = config.paths;



/**
 * General callback utility for streams
 *
 * At a deeper level, this function takes an argument `func` which
 * should be a function expression. The function cb creates
 * a stream transformer, that when it comes time to transform,
 * it fires the `func` expression and finishes without actually
 * manipulating the stream in anyway.
 *
 * The cb function returns stream object,
 * so that gulp may pipe its payload through
 * it and proceed down the funnel.
 */
function cb(func) {
  var stream = new StreamTransform({ objectMode: true });

  stream._transform = function stealthExecuteInStream(file, unused, callback) {
    func();
    callback(null, file);
  };

  return stream;
}


/**
 * Bump the version (making sure we've built the latest dist first :-) )
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
gulp.task('bump-version', ['build:dist'], function () {

	var
    msg = 'Bumping version',
		type = args.type,
		version = args.version,
		options = {};

	if (version) {
		options.version = version;
		msg += ' to ' + version;

	} else {
		options.type = type;
		msg += ' for a ' + type;
	}

  log(msg);

	gulp
		.src(paths.packageConfigFiles)
		.pipe(bump(options))
		.pipe(gulp.dest(paths.rootDir))

		// commit version as a tag on Github
		.pipe(git.commit('Package Version bumped'))

		// read only one file to get the version number
		.pipe(filter(paths.configFiles.npm))

		// **tag it in the repository**
		.pipe(tagVersion())

    // push to remote
    // .pipe(cb(function gitPushToRemote() {
    //   git.push(remote, branch, { args: '--tags' }, function onGitPushError (err) {
    //     if (err) { throw err; }
    //   });
    // }));
});

gulp.task('push-tag', function () {

  var remote = args.remote || 'brian';
  var branch = args.branch || 'master';

  git.push(remote, branch, { args: '--tags' }, function onGitPushError (err) {
    if (err) { throw err; }
  });
});
