const path = require('path')

module.exports = {
  mode: 'production',
  // 如果要生成sourceMap，你应该将你的服务器配置为，不允许普通用户访问 source map 文件！不然会暴露源码，直接不配置devtool或者设置none是一个不错的选择。
  devtool: 'source-map',
  entry: {
    app: './examples/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][hash:8].bundle.js'
  }
}