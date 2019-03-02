const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
var vConsolePlugin = require('vconsole-webpack-plugin'); 
// tool module
const helper = require('./helper')
const {
  isProd,
  isReport,
  isGzip,
  projectType,
  assetsPath,
  getEntry,
  getOutput,
} = helper

let webpackConfig = {
  mode: isProd ? 'production' : 'development',
  entry: getEntry(),
  output: getOutput(),
  devtool: isProd ? false : 'cheap-module-source-map',
  resolve: {
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    modules: [
      assetsPath('src'),
      assetsPath('node_modules')
    ],
    alias: {
      utils: assetsPath('src/utils'),
      page: assetsPath('src/page'),
      toolComponents: assetsPath('src/toolComponents'),
    }
  },
  externals: {
    // 'antd-mobile': 'antd-mobile'
  },
  module: {
    rules: [
      // {
      //   test: /\.(js)$/,
      //   enforce: 'pre',
      //   loader: 'eslint-loader',
      //   include: [assetsPath('public/src')],
      //   exclude: [ /node_modules/ ],
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        include: [assetsPath('src'), assetsPath('src/utils')],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          "css-loader",
          // helper.postcssLoader(),
          helper.lessLoader(),
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // exclude: /^node_modules$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          helper.cssLoader(),
          // helper.postcssLoader(),
          'sass-loader',
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]',
          publicPath: '../'
        }
      },
      { 
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: "file-loader"
      }
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    minimize: isProd,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        uglifyOptions: {
          compress: {
            // drop_console: isProd ? 'drop_console' : false
            drop_console: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks:{
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /node_modules\/(.*)\.js/,
          chunks: 'initial',
          minChunks: 2,
          priority: -10,
          reuseExistingChunk: false
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'h5-template',
      favicon: '',
      inject: true,
      minify: isProd ? {
        html5: false,
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : {},
      filename: `index.html`,
      template: helper.assetsPath(`template/template.html`)
    }),
    // new AddAssetHtmlPlugin(Object.assign({
    //   filepath: helper.assetsPath('node_modules/antd-mobile/dist/antd-mobile.js'),
    //   //  require.resolve('../public/src/plugin/moment.js'),
    //   outputPath: '/js',
    //   publicPath: '/js/',
    //   hash: true,
    //   // attributes: {
    //   //   rel: "preload"
    //   // }
    // }, isProd ? {} : {outputPath: '', publicPath: '/'})
    // ),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[hash].css' : '[name].css',
      chunkFilename: isProd ? '[name].[hash].css' : '[name].css'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(isProd && "production" || "development"),
        isProd: isProd,
        projectType: JSON.stringify(projectType),
      }
    }),
  ]
};

isReport && webpackConfig.plugins.push(new BundleAnalyzerPlugin({generateStatsFile: true}))
// 输出gzip文件
!isProd && webpackConfig.plugins.push(
  new vConsolePlugin({
      filter: [],  // 需要过滤的入口文件
      enable: true // 发布代码前记得改回 false
  }))

isGzip && webpackConfig.plugins.push(
  new CompressionPlugin({
    test: /\.js(\?.*)?$/i,
    exclude: 'node_modules'
  })
)
module.exports = webpackConfig