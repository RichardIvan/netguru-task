'use strict'

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
// const precss = require('precss')
// const autoprefixer = require('autoprefixer')
// const CustomHtmlPlugin = require('./webpack/html-custom-plugin')

// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');
// var dashboard = new Dashboard();
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin')
// var proxyMiddleware = require('http-proxy-middleware')

// const target = {
//   target: 'http://localhost:1337'
// }
// const data = proxyMiddleware('/data', target)

module.exports = {
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  entry: {
    // s: './src/js/s.js',
    index: './src/client/js/index.js',
    // 'service-worker': './src/js/service-worker.js',
    // 'dev-server': 'webpack-dev-server/client?https://local.dev'
    // 'hot-dev-server': 'webpack/hot/only-dev-server',
  // common: [
  //   'lodash'
  //   // 'jquery'
  // ]
  },
  output: {
    path: path.join(__dirname, './dist/client'),
    // publicPath: './src/client',
    // Template based on keys in entry above
    filename: './js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.json'],
    // modulesDirectories: [
    //   './node_modules'
    // ]
    descriptionFiles: ['package.json'],
    modules: [
      path.resolve('./'),
      './node_modules'
    ]
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    // new CustomHtmlPlugin(),
    // new DashboardPlugin(dashboard.setData),
    // new BrowserSyncPlugin(
    //   // BrowserSync options
    //   {
    //     // browse to http://localhost:3000/ during development
    //     host: 'localhost',
    //     port: 3000,
    //     // proxy the Webpack Dev Server endpoint
    //     // (which should be serving on http://localhost:3100/)
    //     // through BrowserSync
    //     proxy: 'http://localhost:8080/',
    //     middleware: [data]
    //   },
    //   // plugin optionss
    //   {
    //     // prevent BrowserSync from reloading the page
    //     // and let Webpack Dev Server take care of this
    //     reload: false
    //   }
    // ),
    new ExtractTextPlugin({ filename: './css/main.css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      //   test: /\.css$/,
      //   loaders: ['style', 'css'],
      //   include: path.join(__dirname, 'src'),
      // },
      test: /\.(css|scss|sass)$/,
      loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!postcss-loader!resolve-url!sass?sourceMap' }),
      include: path.join(__dirname, './')
    },
    // {
    //   test: /\.scss$/,
    //   loader: ExtractTextPlugin.extract('style-loader', `css-loader?modules
    //     &importLoaders=1
    //     &localIdentName=[name]__[local]___[hash:base64:5]`),
    //     // &sourceMap!postcss-loader!sass`),
    //   include: path.join(__dirname, 'app'),
    // },
    {
      test: /manifest.json$/,
      loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
    },
    {
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, './')
      // query: {
      //   cacheDirectory: true
      // }
      // query: {
      //   "presets":[
      //     // "es2015-native-modules",
      //     ["es2015", { "modules": false }],
      //     "stage-2"
      //  ],
      //  "plugins": [
      //      "transform-runtime",
      //      "transform-flow-strip-types",
      //      "transform-object-rest-spread"
      //    ],
      // }
    },
    {
      test: /\.json$/,
      loader: 'json-loader',
      include: path.join(__dirname, './')
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192',
      include: path.join(__dirname, './')
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      query: {
        name: '[path][name].[ext]',
        context: './src/client/',
        publicPath: '../'
      }
    }]
  },
  devServer: {
    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 300
    // }
    // hot: true,
    inline: true,
    // https: true,
    host: '0.0.0.0',
    port: 443,
    contentBase: './src/client/',
    // historyApiFallback: true,
    // quiet: false,
    // noInfo: false,
    // key: fs.readFileSync('./server/private/server.key'),
    // cert: fs.readFileSync('./server/private/server.cert'),
    // proxy: {
    //   '/data': {
    //     target: 'http://localhost:1337'
    //   // pathRewrite: {
    //   //   '^/api' : ''
    //   // }
    //   }
    // }
    // proxy: {
    //   '/html': {
    //     target: 'https://192.168.99.100:8080',
    //     bypass: (req, res, proxyOptions) => {
    //       return '/'
    //       res.send('omfg')
    //       return
    //       res.writeHead(200, {
    //         'Content-Type': 'text/html'
    //       })
    //       res.write(html)
    //       res.end()
    //     }
    //   },
    //   '/data/*': 'http://localhost:1337/'
    // }
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
  }
  // postcss () {
  //   return [precss, autoprefixer]
  // }
// sassLoader: {
//   includePaths: [path.resolve(__dirname, 'app')],
// },
  // devServer: {
    // contentBase: './dist',
    // hot: true,
    // quiet: false,
    // noInfo: false,
  // },
// externals: {
//   jquery: {
//     root: 'jQuery',
//     commonjs: 'jquery',
//     commonjs2: 'jquery',
//     amd: 'jquery'
//   }
// }
}
