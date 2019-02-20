
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

现在的配置是可以满足我们的开发环境的，我原本考虑是不是把webpack的配置这一块先搞定，后面想了一下，还是决定一边写组件，一遍完善webpack配置，这样的话才能够看到webpack在开发中发挥的具体作用。

接下来，我们写一个 loading 组件，新建 src/components/loading.vue

~~~v
<template>
  <div :class="wrapperClass" ref="loading">
    <div :class="loadingClass">
      <div :class="iconClass"></div>
      <p :class="textClass">正在加载中</p>
    </div>
  </div>
</template>

<script>
const prefix = 'lai'
export default {
  data () {
    return {

    }
  },
  computed: {
    wrapperClass () {
      return `${prefix}-loading__wrapper`
    },
    loadingClass () {
      return `${prefix}-loading`
    },
    iconClass () {
      return `${prefix}-loading__icon`
    },
    textClass () {
      return `${prefix}-loading__text`
    }
  },
  mounted () {
    this.initStyle()
  },
  methods: {
    initStyle () {
      this.$refs.loading.parentNode.style.position = 'relative'
    }
  }
}
</script>


<style lang="less" scoped>
@prefix: lai;
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.@{prefix}-loading__wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  .@{prefix}-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .@{prefix}-loading__icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left: 4px solid #7983ff;
      border-radius: 50%;
      animation: spin 1.2s linear infinite;
    }
    .@{prefix}-loading__text {
      color: #000;
    }
  }
}
</style>
~~~

然后在页面上直接使用，发现样式没有什么问题，接下里完善下基本的 js 逻辑，其实作为组件使用现在基本是可以用的，但是，大多数场景下，我们都是将 loading 作为指令和或者实例方法使用。先将 loading 组件修改成指令的使用方式。

新建 src/directives/loading.js
~~~js
import Vue from 'vue'
import LoadingComponent from '../components/loading'
const Loading = Vue.extend(LoadingComponent)

export default {
  inserted (el, binding, vnode, oldVnode) {
    const child = document.createElement('div')
    const loadingText = el.getAttribute('loading-text')
    if (binding.arg === 'fullPage') {
      document.body.appendChild(child)
    } else {
      el.appendChild(child)
    }
    const loading = new Loading({
      el: child
    })
    if (loadingText) {
      loading.loadingText = loadingText
    }
    el.loading = loading
  },
  update (el, binding, vnode, oldVnode) {
    // 更新loading组件的值
    el.loading.isShow = binding.value
  }
}
~~~
大概解释一下上边的代码，首先是用 Vue 的 extend 方法生成一个 Loading 的子类，然后生成一个 loading实例，并通过 $mount 方法获取到当前 实例的 dom，最后将 dom push 进入容器就好了。

上边就是一个非常简单的指令，关于指令的其他内容比如钩子函数，参数这些，可以去官网查看[文档](https://cn.vuejs.org/v2/guide/custom-directive.html)

接下来完成 loading 的实例方法

新建 src/prototypes/loading.js

~~~js
import Vue from 'vue'
import LoadingComponent from '../components/loading'
const Loading = Vue.extend(LoadingComponent)

const loading = (options) => {
  if (Vue.prototype.loadingComponent && Vue.prototype.loadingComponent.$el) {
    return Vue.prototype.loadingComponent
  }
  const child = document.createElement('div')
  if (options.el) {
    if (options.el.nodeType === 1) {
      options.el.appendChild(child)
    } else {
      document.querySelector(el).appendChild(child)
    }
  } else {
    document.body.appendChild(child)
  }
  const loading = new Loading({
    el: child,
    data: options
  })
  Vue.prototype.loadingComponent = loading
  return loading
}

export default loading
~~~

> Thu Nov 22 19:47:06 DST 2018
  最近这几天请假了一天，上班工作紧，恐怕没时间写。口怕，不知道这次有没有毅力，坚持！

# select 组件
在写 select 组件之前，我们先引入了一下 iconfont，用来解决 icon 的需求，所以为了能够使用字体图标的字体文件，我们需要给 webpack 配置了一下 url-loader，我们找到 url-loader文档， 当前最新的版本是 url-loader@1.1.2，我们发现url-loader当前的选项就三个 limit fallback mimetype(不设置的话会根据文件拓展名自己设置)，我们为了方便之后可能需要解决图片的问题，也给配置上 file-loader。设置 limit 为 1mb，然后在 fallback 中配置 file-loader，如果超过 1mb 的文件就会使用 file-loader 来处理，并且打包后会存在images文件夹下面。接着配置一下 file-loader 的输出文件名字和路径。
~~~js
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
~~~
另外，我们顺便给package.json配置下边的命令：
~~~json
"clean": "rimraf dist/*",
"build": "npm run clean && webpack --config webpack.config.js"
~~~
最后，把上边依赖的包都安装上：
~~~
npm install rimraf url-loader file-loader --save-dev
npm run build
tree dist

dist/
├── app0e79bee6.bundle.js
├── images
│   └── cache_user_icon320332b.jpg
└── index.html
~~~

好的，我们接着运行开发模式进行 select 下拉组件的开发。

一个简单的选择框就两部分，一部分是input的输入框（这个输入框甚至不需要输入），一部分是下拉的列表。
~~~html
<template>
  <div class="lai-select__wrapper" style="width: 200px">
    <div class="lai-select__selection" @click="isShow = !isShow">
      <span class="lai-select__placeholder">请选择</span>
      <i class="iconfont icon-previewleft lai-select__icon"></i>
    </div>
    <div class="lai-select__options" v-show="isShow">
      <div class="lai-select__option">选项1</div>
      <div class="lai-select__option">选项2</div>
      <div class="lai-select__option">选项3</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="less" scoped>
.lai-select__wrapper {
  width: 100%;
  position: relative;
  .lai-select__selection {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    position: relative;
    border: 1px solid #dcdee2;
    font-size: 12px;
    &:focus {
      border: 1px solid red;
    }
    .lai-select__placeholder {
      line-height: 30px;
      color: #c5c8ce;
    }
    .lai-select__icon {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%) rotateZ(-90deg);
      color: #c5c8ce;
    }
  }
  .lai-select__options {
    width: 100%;
    margin-top: 2px;
    padding: 4px 0;
    box-sizing: border-box;
    box-shadow: 0px 1px 8px -2px rgba(0, 0, 0, 0.2);
    user-select: none;
    .lai-select__option {
      padding: 7px 10px;
      font-size: 12px;
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
~~~
上边的代码足够完成一个普通的select的样式，我们通过点击 selection 可以实现下来菜单的显示隐藏，接下里我们加上部分的逻辑。
~~~html
<template>
  <div class="lai-select__wrapper" style="width: 200px">
    <div class="lai-select__selection" @click="isShow = !isShow">
      <span class="lai-select__placeholder">{{selected.label || selected || '请选择'}}</span>
      <i class="iconfont icon-previewleft lai-select__icon"></i>
    </div>
    <div class="lai-select__options" v-show="isShow">
      <div 
        class="lai-select__option" 
        v-for="(option, index) in options" 
        :key="index"
        @click="handleSelected(option)">
          {{option.label}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      selected: this.value
    }
  },
  props: {
    value: {
      type: [Array,String,Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  beforeMount () {
    // 初始化 selected 的值
    this.getSelected()
  },
  methods: {
    getSelected () {
      if (this.options.toString().indexOf('[object Object]') !== -1) {
        this.selected = this.options.find(({value}) => value === this.value)
      } else {
        this.selected = this.value
      }
    },
    handleSelected (selected) {
      let value 
      if (typeof selected === 'object') {
        value = selected.value
      } else {
        value = selected
      }
      this.selected = selected
      this.$emit('input', value)
      this.$emit('change', value)
      this.isShow = false
    }
  },
  watch: {
    value (val) {
      this.getSelected()
    }
  }
}
</script>

<style lang="less" scoped>
.lai-select__wrapper {
  width: 100%;
  position: relative;
  .lai-select__selection {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    padding: 0 10px;
    position: relative;
    border: 1px solid #dcdee2;
    font-size: 12px;
    &:focus {
      border: 1px solid red;
    }
    .lai-select__placeholder {
      line-height: 30px;
      color: #c5c8ce;
    }
    .lai-select__icon {
      display: inline-block;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%) rotateZ(-90deg);
      color: #c5c8ce;
    }
  }
  .lai-select__options {
    width: 100%;
    margin-top: 2px;
    padding: 4px 0;
    box-sizing: border-box;
    box-shadow: 0px 1px 8px -2px rgba(0, 0, 0, 0.2);
    user-select: none;
    .lai-select__option {
      padding: 7px 10px;
      font-size: 12px;
      &:hover {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>
~~~
现在我们就可以通过下边的方式调用这个组件：
~~~html
<lai-select v-model="selected" :options="options" @change="change"></lai-select>
~~~
这样一来我们就实现了一个常见的单选的 select 组件。

昨天写了一下单选的select 感觉有点乱，今天特意整理了一下代码：
~~~html
<template>
  <div class="lai-select__wrapper" style="width: 200px" v-click-outside="hideOptions">
    <div class="lai-select__selection" @click="showOptions" ref="selection">
      <span class="lai-select__placeholder">{{selected.label || selected || '请选择'}}</span>
      <i class="iconfont icon-previewleft lai-select__icon"></i>
    </div>
    <div class="lai-select__options" v-show="isShow && options.length">
      <div 
        class="lai-select__option" 
        v-for="(option, index) in options" 
        :key="index"
        @click="handleSelected(option)">
          {{option.label}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShow: false,
      selected: this.value
    }
  },
  props: {
    value: {
      type: [Array,String,Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    // 支持搜索
    filterable: {
      type: Boolean,
      default: false
    }
  },
  beforeMount () {
    // 初始化 selected 的值
    this.getSelected()
  },
  methods: {
    getSelected () {
      if (this.options.toString().indexOf('[object Object]') !== -1) {
        this.selected = this.options.find(({value}) => value === this.value)
      } else {
        this.selected = this.value
      }
    },
    handleSelected (selected) {
      let value 
      if (typeof selected === 'object') {
        value = selected.value
      } else {
        value = selected
      }
      this.selected = selected
      this.$emit('input', value)
      this.$emit('change', value)
      this.isShow = false
    },
    showOptions (e) {
      this.isShow = !this.isShow
    },
    hideOptions () {
      this.isShow = false
    }
  },
  watch: {
    value (val) {
      this.getSelected()
    },
    isShow (val) {
      if (val) {
        this.$refs.selection.classList.add('lai-select__focus')
      } else {
        this.$refs.selection.classList.remove('lai-select__focus')
      }
    }
  }
}
</script>
~~~
将 css 代码移到了 src/assets/style/components 下面，以后每一个组件都建立对应的 less 文件。

上边还用到了一个 v-click-outside 指令，顺便把代码贴一下：
~~~js
// src/directives/click-ouside.js
let clickHandleOutside
export default {
  bind (el, binding) {
    if (typeof binding.value !== 'function') {
      throw new TypeError('v-clickOutside 的值必须是一个函数')
    }
    clickHandleOutside = function (e) {
      if (!el.contains(e.target)) {
        binding.value()
      }
    }
    document.addEventListener('click', clickHandleOutside, false)
  },
  unbind () {
    document.removeEventListener('click', clickHandleOutside, false)
  }
}
~~~
这样一来单选的 select 的基本就完成了。

接下来我们先实现可搜索的功能： 
~~~html
<template>
  <div class="lai-select__wrapper" style="width: 200px" v-click-outside="hideOptions">
    <div class="lai-select__selection" @click="showOptions" ref="selection">
      <input type="text" class="lai-select__input" v-show="filterable" v-model="filter" @blur="handleSelectInputBlur">
      <div class="lai-select__value" v-if="selected && !filter">{{selected.label || selected}}</div>
      <span class="lai-select__placeholder" v-if="!selected && !filter">请选择</span>
      <i class="iconfont icon-previewleft lai-select__icon"></i>
    </div>
    <div class="lai-select__options" v-show="isShow && selectOptions.length">
      <div 
        class="lai-select__option" 
        v-for="(option, index) in selectOptions" 
        :key="index"
        @click="handleSelected(option)">
          {{option.label}}
      </div>
    </div>
     <div class="lai-select__options" v-show="isShow && !selectOptions.length">
      <div 
        class="lai-select__option" 
        >
          未找到相关数据
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'lei-select',
  data () {
    return {
      filter: '',
      isShow: false,
      selected: this.value,
      selectOptions: [],
    }
  },
  props: {
    value: {
      type: [Array,String,Number],
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    // 支持搜索
    filterable: {
      type: Boolean,
      default: false
    }
  },
  beforeMount () {
    // 初始化 selected 的值
    this.selectOptions = this.options
    this.getSelected()
  },
  methods: {
    getSelected () {
      if (!this.value || !this.options.length) return
      if (this.options.toString().indexOf('[object Object]') !== -1) {
        this.selected = this.options.find(({value}) => value === this.value)
      } else {
        this.selected = this.value
      }
    },
    handleSelected (selected) {
      let value 
      if (typeof selected === 'object') {
        value = selected.value
      } else {
        value = selected
      }
      this.selected = selected
      this.$emit('input', value)
      this.$emit('change', value)
      this.isShow = false
    },
    filterOptions () {
      if (!this.options.length) return 
      if (this.options.toString().indexOf('[object Object]') !== -1) {
        this.selectOptions = this.options.filter(item => item.label.indexOf(this.filter) !== -1)
      } else {
        this.selectOptions = this.options.filter(item => item.indexOf(this.filter) !== -1)
      }
    },
    handleSelectInputBlur () {
      this.filter = ''
    },
    showOptions () {
      this.isShow = true
    },
    hideOptions () {
      this.isShow = false
    }
  },
  watch: {
    filter (val) {
      if (val) {
        this.filterOptions()
      } else {
        this.isShow = false
        this.selectOptions = this.options
      }
    },  
    value (val) {
      this.getSelected()
    },
    isShow (val) {
      if (val) {
        this.$refs.selection.classList.add('lai-select__focus')
      } else {
        this.$refs.selection.classList.remove('lai-select__focus')
      }
    }
  }
}
</script>
~~~

感觉这样写组件不是什么好办法，乱而且没什么思路，先暂停进度，思考一下。












