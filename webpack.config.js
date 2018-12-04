const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    app: './examples/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash:8].bundle.js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack
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
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
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
    // 最新的 vue-loader（15.0以后吧） 需要引入这个插件
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'LaiUI',
      template: path.resolve(__dirname, 'index.html')
    }),
    // 热重载插件 配合 devServer.hot
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
}
