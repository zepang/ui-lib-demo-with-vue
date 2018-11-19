# 从零开始写一个 VueUI 库

## 建立目录

~~~
├── README.md
├── examples // 展示
├── node_modules
├── package-lock.json
├── package.json

├── src // 组件
└── webpack.config.js //webpack
~~~

## webpack 配置

先不管什么杂七杂八的配置，用最简单的配置跑起来。

~~~js
module.exports = {
  entry: './examples/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contentHash:8].bundle.js'
  }
}
~~~

在package.json 中加入下边的 script

~~~json
"scripts": {
  "dev": "webpack --config webpack.config.js"
}
~~~

在命令行输入

~~~
npm run dev
~~~

然后你就会发现报下边的错误

~~~
You may need an appropriate loader to handle this file type.....
ERROR in ./examples/app.vue 1:0
~~~

说明我们需要 vue-loader 来处理 .vue 格式的文件，接着去 [vue-loader](https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE) 文档，按照文档安装和配置 vue-loader

这个时候你的 webpack.config.js 应该是这个样子

~~~js
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: './examples/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contentHash:8].bundle.js'
  },
  module: {
    rules: [
      {
        test: '/\.vue$/',
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 最新的 vue-loader（15.0以后吧） 需要引入这个插件
    new VueLoaderPlugin()
  ]
}
~~~

如果你用的是 webpack 4.0 以后的版本还会发现下面的警告

~~~
WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/
~~~

我们点开这个 webpack 的链接，我们发现 webpack 提供了一个 mode 的选项，对应的值可以是 development 或者 production，不同模式给我们提供了不同的设置，我这里直接把官网的表格粘
贴过来了，具体内容可以去官网查看。

| Option | Description |
| ------ | ----------- |
| development | Sets process.env.NODE_ENV on DefinePlugin to value development. Enables NamedChunksPlugin and NamedModulesPlugin. |
| production | Sets process.env.NODE_ENV on DefinePlugin to value production. Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin |
| none | Opts out of any default optimization options |

我们这里先选择

~~~js
mode: 'development'
~~~

我们再次跑一遍 webpack，发现 webpack 打包成功。webpack 先告一段落，下面我们一边写代码一边
结合使用webpack。

在 vue 项目中最常见的调用 UI 的方法是：

~~~js
import Vue from 'vue'
import UI from 'UI'

Vue.use(UI)
~~~

所以我们需要新建 src/index.js，在 index.js 中暴露一个包含 install 方法的对象，在 install 中注册全局组件，指令，过滤器，实例方法等等，具体的 vue 插件的内容大家可以去看 vue 的文档 [插件](https://cn.vuejs.org/v2/guide/plugins.html)。

~~~js
// 组件
import components from './components'
// 指令
const directives = {}
// 过滤器
const filters = {}
// 实列方法
const prototypes = {}

export default {
  install (Vue, options) => {
    // 注册组件
    for (let key in components) {
      Vue.compoent(`lai-${key.toLowerCase()}`, components[key])
    }
    // 注册指令
    for (let key in directives) {
      Vue.directive(key, directives[key])
    }
    // 注册过滤器
    for (let key in filters) {
      Vue.filter(key, filters[key])
    }
    // 绑定实力方法
    for (let key in prototypes) {
      Vue.prototype[key] = prototypes[key]
    }
  }
}
~~~

我们在 examples/index.js 中引入，并新建一个 Vue 的实例.

~~~js
import Vue from 'vue'
import LaiUi from '../src/index.js'
import router from './routes.js'
import App from './app.vue'

Vue.use(LaiUi)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
~~~

我们在项目中会使用到新的 js 语法，为了兼容性，我们在 webpack 配置 babel-loader 来转义成 es5.

~~~
npm install -D babel-loader @babel/core @babel/preset-env webpack
~~~

暂时不需要进行特别详细的配置

~~~js
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }
}
~~~

接下来，我们新建 src/components/switch.vue 测试一下

为了能够将项目在开发环境跑起来，我们需要安装 webpack-dev-server

~~~
npm install webpack-dev-server --save-dev
~~~

package.json

~~~json
"dev": "webpack-dev-server"
~~~

直接运行之后发现 webpack-dev-server 默认在 8080 端口启动了一个服务，并将当前目录作为静态资源路径的根目录，接着我们按照 [webpack-dev-server 文档](https://www.webpackjs.com/configuration/dev-server/)的添加

~~~js
devServer: {
  contentBase: path.join(__dirname, "dist"),
  compress: true,
  port: 9000
}
~~~
我们将服务根目录设置为我们的打包文件的目录 dist ，重新启动服务，用浏览器打开 localhost:9000 我们可以看到 dist 目录（内存中）中的文件。

webpack-dev-server 除了会设置一个静态文件目录，还会展示启动目录下 index.html 文件，手动创建这个文件很容易，但是，我们需要将每次打包的js文件都加载到这个 index.html 页面中，所以，我们需要用到 html-webpack-plugin 这个插件，具体[说明](https://www.webpackjs.com/plugins/html-webpack-plugin/)

~~~
npm install --save-dev html-webpack-plugin
~~~

安装的时候发现给我们报了一个警告
~~~
vue-loader@15.4.2 requires a peer of css-loader@* but none is installed. You must install peer dependencies yourself
~~~

大概意思就是说 vue-loader 依赖 css-loader，但是我们没有安装，所以，我们再次安装一下 css-loader

我们接着在 webpack.config.js 中引入
~~~js
....
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  ...
  plugins: [
    // 最新的 vue-loader（15.0以后吧） 需要引入这个插件
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  }
}
~~~

启动之后，打开浏览器我们可以看到展示的 index.html 中引入 了对应得 js。这里需要提一下的是，上边提到 webpack-dev-server 的目录是指在内存中生产的目录，不是我们硬盘上的文件，所以，你跑起来服务在你的文件目录下是找不到文件的。

跑起来我们发现报错了，找不到 #app，因为用 html-webpack-plugin 创建的 index.html 是不带根节点的，我们再根据 html-webpack-plugin 的文档进行配置

~~~js
new HtmlWebpackPlugin({
  title: 'LaiUI',
  template: path.resolve(__dirname, 'index.html')
})
~~~

之后我们在根目录下创建一个 index.html 文件，创建一个根节点

~~~html
<div id="app"></div>
~~~

再次运行，没问题

好的，接下来我们写一个 demo 试一下

创建 src/components/switch.vue
~~~html
<template lang="html">
  <div class="swtich-wrapper">
    <input type="checkbox" id="switch-input" class="switch-input">
    <label for="" class="switch-label" for="switch-input"></label>
  </div>
</template>

<script>
export default {
  name: 'switchPage'
}
</script>

<style lang="less">
.switch-label {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: all 0.3s;
  &:after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background-color: white;
    top: 1px;
    left: 1px;
    transition: all 0.3s;
  }
}
input[type='checkbox']:checked + .switch-label::after {
  transform: translateX(20px);
}
input[type='checkbox']:checked + .switch-label {
  background-color: #7983ff;
}
.switch-input {
  width: 0;
  height: 0;
  position: absolute;
  z-index: -9999;
  border: 0;
  opacity: 0;
}
</style>

~~~

保存之后 webpack-dev-server 肯定是报错的，因为我们这里用了 less，而我们还没有配置对应的 loader 来处理文件。我们安装下边的 loader

~~~
npm install vue-style-loader css-loader less-loader less --save-dev
~~~

在 webpack.config.js 中添加
~~~js
{
  test: /\.less$/,
  use: [
    'vue-style-loader',
    'css-loader',
    'less-loader'
  ]
}
~~~
webpack 的 loader 的处理文件的优先级是从尾部往头部递减的，所以这几个loader的顺序不要写错。
另外，这里的将 style-loader 替换成 vue-style-loader 是因为 vue-style-loader 除了支持 style-loader 的功能还支持样式的热重载。这一点在 [vue-loader](https://vue-loader.vuejs.org/zh/guide/hot-reload.html#%E7%8A%B6%E6%80%81%E4%BF%9D%E7%95%99%E8%A7%84%E5%88%99) 上有提到。

讲到热重载，我们顺便把 webpack-dev-server 上的热重载配置添上
~~~js
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
~~~
最快的还是直接在 webpack-dev-server --hot 。
