const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var ansiColors = {
  red: '00FF00' // note the lack of "#"
}
var overlayStyles = {
  color: '#FF0000' // note the inclusion of "#" (these options would be the equivalent of div.style[option] = value)
}
var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true&ansiColors=' + encodeURIComponent(JSON.stringify(ansiColors)) + '&overlayStyles=' + encodeURIComponent(JSON.stringify(overlayStyles));

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: {
    app: [hotMiddlewareScript, './examples/index.js']
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
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
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
      title: 'LAIUI',
      template: 'index.html',
      favicon: 'favicon.ico'
    }),
    // 热重载插件 
    new webpack.HotModuleReplacementPlugin()
  ],
  /**
   * 如果使用的是 webpack-dev-server 可以启动西面的配置
   */
  // devServer: {
  //   hot: true,
  //   contentBase: path.join(__dirname, "dist"),
  //   compress: true,
  //   port: 9000,
  //   quiet: true
  // }
}
