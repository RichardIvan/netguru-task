'use strict'

// const fs = require('fs')
const gulp = require('gulp')
// const concat = require('gulp-concat')
// const uglify = require('gulp-uglify')
// const documentation = require('gulp-esdoc')
// const documentation = require('gulp-documentation')
// const sourcemaps = require('gulp-sourcemaps')
const gutil = require('gulp-util')
// const shell = require('gulp-shell')
const clean = require('gulp-clean')
const runSequence = require('run-sequence')
const jscpd = require('gulp-jscpd')
// const plumber = require('gulp-plumber')
// const notify = require('gulp-notify')
// const watch = require('gulp-watch')

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const stream = require('webpack-stream')

const webpackConfig = require('./webpack.config.prod.js')
const webpackDevConfig = require('./webpack.config.dev.js')
const webpackServerConfig = require('./webpack.config.server.js')

const path = {
  HTML: 'src/index.html',
  ALL: ['src/**/*.js'],
  MINIFIED_OUT: 'build.min.js',
  DEST_SRC: 'dist/src/client',
  DEST_SRC_SERVER: 'dist/src/server',
  DEST_BUILD: 'dist/client',
  DEST_BUILD_SERVER: 'dist/server',
  DEST: 'dist/client',
  TESTS: './tests/**/*.js'
}

gulp.task('jscpd', () => gulp.src('src/*')
  .pipe(jscpd({
    languages: ['javascript', 'css', 'jsx'],
    verbose: true
  }))
)

gulp.task('clean', () => gulp.src(path.DEST_BUILD,
  {
    read: false
  }
).pipe(clean()))

gulp.task('clean-server', () => gulp.src(path.DEST_BUILD_SERVER,
  {
    read: false
  }
).pipe(clean()))

gulp.task('webpack', [], () =>
// gulp looks for all source files under specified path
gulp.src(path.ALL)
  // creates a source map which would be very helpful for debugging
  // by maintaining the actual source code structure
  // .pipe(sourcemaps.init())
  // blend in the webpack config into the source files
  .pipe(stream(webpackConfig, webpack))
  // minifies the code for better compression
  // .pipe(ignore.exclude([ "**/*.map" ]))
  // .pipe(uglify())
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.DEST_BUILD))
)

gulp.task('webpack-server', [], () =>
// gulp looks for all source files under specified path
gulp.src(path.ALL)
  // creates a source map which would be very helpful for debugging
  // by maintaining the actual source code structure
  // .pipe(sourcemaps.init())
  // blend in the webpack config into the source files
  .pipe(stream(webpackServerConfig, webpack))
  // minifies the code for better compression
  // .pipe(ignore.exclude([ "**/*.map" ]))
  // .pipe(uglify())
  // .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.DEST_BUILD_SERVER))
)

// function can use callback
gulp.task('webpack-dev-server', () => {
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(webpackDevConfig), {
    // publicPath: '/',
    // // publicPath: `/ + ${webpackDevConfig.output.publicPath}`,
    // // inline: true,
    // https: true,
    // // hot: true,
    // inline: true,
    // cache: true,
    // watch: true,
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: true
    // },
    // host: '0.0.0.0',
    // // port: 8080,
    // key: fs.readFileSync('./src/server/private/key.pem'),
    // cert: fs.readFileSync('./src/server/private/cert.pem'),
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: true,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: false,
      errorDetails: false,
      warnings: false,
      publicPath: false
    }
    // proxy: {
    //   '/html': {
    //     target: 'https://192.168.99.100:8080',
    //     bypass: (req, res, proxyOptions) => {
    //       // return '/'
    //       // res.send('omfg')
    //       // return
    //       res.writeHead(200, {
    //         'Content-Type': 'text/html'
    //       })
    //       res.write(html)
    //       res.end()
    //     }
    //   },
    //   '/data/*': 'http://localhost:1337/'
    // }
  }).listen(8080, '0.0.0.0', (err) => {
    if (err) throw new gutil.PluginError('webpack-dev-server', err)
    gutil.log('[webpack-dev-server]', 'http://0.0.0.0:8080/webpack-dev-server/index.html')
  })
})

// gulp.task('test', () => gulp.src('', { read: false })
//   .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
//   .pipe(shell(['npm run local-test'])))

// gulp.task('test_watch', () => gulp.src('', { read: false })
//   .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
//   .pipe(shell(['npm run local-test:watch']))
//   .pipe(shell(['npm run cover'])))

// gulp.task('watch_tests', () => {
//   return watch(path.TESTS, ['test'])
// })

// gulp.task('watch', () => {
//   watch(path.ALL.concat(path.TESTS), () => runSequence(['test']))
// })

// gulp.task('cover', () => gulp.src('', { read: false })
//   .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
//   .pipe(shell(['npm run cover'])))

gulp.task('docs', function () {
  gulp.src('./src/js/index.js')
    .pipe(documentation({ format: 'md' }))
    .pipe(gulp.dest('docs/md-docs'))

  gulp.src('./src/js/index.js')
    .pipe(documentation({ format: 'html' }))
    .pipe(gulp.dest('docs/html-docs'))

  gulp.src('./src/js/index.js')
    .pipe(documentation({ format: 'json' }))
    .pipe(gulp.dest('docs/json-docs'))
})

gulp.task('build', () => {
  runSequence(['clean', 'jscpd'], 'webpack', 'webpack-server')
})

// gulp.task('build-server', () => {
//   runSequence(['clean', 'jscpd'], 'webpack-server')
// })

// gulp.task('socket', () => gulp.src('', { read: false })
//   .pipe(shell(['npm run server']))
// )

// gulp.task('db', () => gulp.src('', { read: false })
//   .pipe(shell(['npm run db']))
// )

// gulp.task('start', () => {
//   runSequence(['socket'])
// })

// gulp.task('server', () => gulp.src('', { read: false })
//   .pipe(shell(['npm run start'])))
// gulp.task('default', ['socket', 'webpack-dev-server'])
gulp.task('default', ['webpack-dev-server'])
