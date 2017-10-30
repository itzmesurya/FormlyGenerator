var gulp = require('gulp');
var args = require('yargs').argv;
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var del = require('del');
var gulpif = require('gulp-if');
var path = require('path');
var _ = require('lodash');
var injectString = require('gulp-inject-string');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var port = process.env.PORT || config.defaultPort;

var themeConfig = {};
var themeName = config.defaultTheme;

/** Task to inject bower files into the default.html */
gulp.task('bower-files-inject', [], function () {
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    return gulp.src('./src/client/index.html').pipe(wiredep(options)).pipe(gulp.dest('./src/client/'));
});

/** inject the css files for the formly generator */
gulp.task('inject-formly-generator-css', ['bower-files-inject'], function () {
    return gulp
        .src(config.index)
        // assuming $ represents gulp-load-plugin module
        .pipe($.inject(gulp.src([]
                .concat(config.css.app), {
                    read: true
                }), {
                starttag: '<!-- inject:appcss -->'
        }))
        .pipe(gulp.dest(config.client));
});
/** inject the app files for the formly generator */
gulp.task('inject-formly-generator-files', ['inject-formly-generator-css'], function () {
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src([]
            .concat(config.js.app), {
                read: true
            }), {
            starttag:'<!-- inject:appjs -->'
        }))
        .pipe(gulp.dest('./src/client/'));
});

/**
 * Serve Dev Task: Serving the dev and calling
 * inject task
 */
gulp.task('serve-dev', ['inject-formly-generator-files'], function () {
    serve(true /* isDev */ );
});
////////////
/**
 * Serve Build Task: Serving the build
 */
gulp.task('serve-build', ['build'], function () {
    serve(false /* isDev */ );
});

/**
 * Activates the gulp module by setting variables
 */
function activate() {

    themeName = args.theme || config.defaultTheme;
    themeConfig = require(config.theme + themeName + config.themeConfigFileName);
    var t = './src/themes/' + 'angularMaterial' + '/theme.config.json';
    log('themeName: ' + themeName);
    log('themeConfig: ' + themeConfig.app.starttag);
}

function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}
/**
 * clean Function: Cleans up the paths specified
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}
/**
 * log Function: Logs the messages with the font color blue
 */
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}
/**
 * Serve Function: Serving the node requests for
 * dev and build environment
 * --restart: nodemon restarted and browserSync has been called
 * --start: nodemon started and startBrowserSync has been called
 * --crash: nodemon crashed due to script scrashed for some reason
 * --exit: nodemon exited
 */
function serve(isDev, specRunner) {
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return $.nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({
                    stream: false
                });
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync(isDev, specRunner);
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
}
/**
 * startBrowser Function: Starting the browser and syncs the files
 * for dev and non dev environments
 */
function startBrowserSync(isDev, specRunner) {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);
    log('isDev ' + isDev);
    if (isDev) {
        gulp.watch([config.less, config.theme + themeName + '/**/*.*',
                '!' + config.theme + themeName + '/libraries/**/*.*'
            ], ['styles'])
            .on('change', changeEvent);
    } else {
        gulp.watch([config.less, config.js.app, config.html, config.theme + themeName + '/**/*.*',
                '!' + config.theme + themeName + '/libraries/**/*.*'
            ], ['optimize', browserSync.reload])
            .on('change', changeEvent);
    }

    var options = {
        proxy: 'localhost:' + port,
        port: 3434,
        files: isDev ? [
            config.client + '**/*.*',
            '!' + config.less,
            config.temp + '**/*.css',
            config.theme + themeName + '/**/*.*',
            '!' + config.theme + themeName + '/libraries/**/*.*'
        ] : [],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    if (specRunner) {
        options.startPath = config.specRunnerFile;
    }

    browserSync(options);
}
/**
 * notify Function: Notifies about the gulp events
 */
function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}