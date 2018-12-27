const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  mode: 'production',
  // 如果要生成sourceMap，你应该将你的服务器配置为，不允许普通用户访问 source map 文件！不然会暴露源码，直接不配置devtool或者设置none是一个不错的选择。
  devtool: 'hidden-source-map',
  entry: {
    app: './examples/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name][chunkhash].bundle.js'
  },
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|png|jpg|jpeg|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: {
            loader: 'file-loader',
            options: {
              name: '[name][hash:7].[ext]',
              outputPath: 'images/'
            }
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[contenthash].css",
      chunkFilename: "[contenthash].css"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: true,
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  performance: {
    hints: false
  },
  stats: {
    hash: true,
    version: true,
    timings: true,
    env: true,
    cachedAssets: false,
    modules: false,
    entrypoints: false
  }
}