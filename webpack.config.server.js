'use strict'

const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const precss = require('precss')
const autoprefixer = require('autoprefixer')
// const Visualizer = require('webpack-visualizer-plugin')

// const CustomHtmlPlugin = require('./webpack/html-custom-plugin')

const nodeModules = {}
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod
  })

module.exports = {
  devtool: 'hidden-source-map',
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  entry: {
    index: './src/server/js/index.js'
  },
  output: {
    path: path.join(__dirname, './dist/server'),
    // Template based on keys in entry above
    filename: './js/[name].js'
  },
  externals: nodeModules,
  resolve: {
    extensions: ['.js', '.json'],
    descriptionFiles: ['package.json'],
    modules: [
      path.resolve('./'),
      './node_modules'
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false
    //   }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    }),
    // new CustomHtmlPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/index.html'
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new ExtractTextPlugin({ filename: './css/main.css', allChunks: true, context: './src' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // new Visualizer({filename: '../stats/stats.html'})
  ],
  module: {
    loaders: [{
      //   test: /\.css$/,
      //   loaders: ['style', 'css'],
      //   include: path.join(__dirname, 'app'),
      // },
      test: /\.(css|scss|sass)$/,
      loader: ExtractTextPlugin.extract(
        {
          fallbackLoader: 'style-loader',
          loader: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]&sourceMap!postcss-loader!resolve-url!sass?sourceMap',
          publicPath: '../'
        }),
      include: path.join(__dirname, './')
    },
    {
      test: /manifest.json$/,
      loader: 'file-loader?name=manifest.json!web-app-manifest-loader'
    },
    // {
    //   test: /\.scss$/,
    //   loader: ExtractTextPlugin.extract('style-loader', `css-loader?modules
    //     &importLoaders=1
    //     &localIdentName=[name]__[local]___[hash:base64:5]
    //     &sourceMap!postcss-loader!sass`),
    //   include: path.join(__dirname, 'app'),
    // },
    {
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, './')
      // query: {
      //   "plugins": [
      //     "transform-runtime",
      //     "transform-flow-strip-types",
      //     "transform-object-rest-spread"
      //   ],
      //   "presets":[
      //     "es2015-native-modules",
      //     // ["es2015", { "modules": false }],
      //     "stage-2"
      //   ],
      // }
    },
    {
      test: /\.json$/, loader: 'json-loader',
      include: path.join(__dirname, './')
    },
    {
      test: /\.(png|jpg)$/,
      loader: 'url-loader',
      query: {
        limit: 8192
      }
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
      query: {
        name: '[path][name].[ext]',
        context: './src'
      }
    }]
    // postcss () {
    //   return [precss, autoprefixer]
    // }
  }
  // stats: {
  //     colors: true,
  //     hash: false,
  //     version: false,
  //     timings: false,
  //     assets: false,
  //     chunks: false,
  //     modules: false,
  //     reasons: false,
  //     children: false,
  //     source: false,
  //     errors: false,
  //     errorDetails: false,
  //     warnings: false,
  //     publicPath: false
  //   }
  //   sassLoader: {
  //     includePaths: [path.resolve(__dirname, './')]
  //   }
  // }
}
