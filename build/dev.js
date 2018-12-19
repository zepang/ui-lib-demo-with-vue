const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const portfinder = require('portfinder')
const chalk = require('chalk')
const ora = require('ora')

const app = express()
const config = require('./webpack.dev.conf.js')
const compiler = webpack(config)
let defaultPort = 8080

const spinner = ora('Compiling for development...').start()
const instance = webpackDevMiddleware(compiler, {
  hot: true,
  compress: true,
  watchOptions: {
    poll: true
  },
  logLevel: 'silent'
})
instance.waitUntilValid(() => {
  spinner.stop()
  console.log(chalk.green('you application is running on http://localhost:' + defaultPort)) 
})
app.use(instance)
app.use(webpackHotMiddleware(compiler, {
  log: false,
  heartbeat: 2000
}))

portfinder.getPort(function (error, port) {
  if (error) {
    throw new Error(error)
  } else {
    process.env.PORT = port
    app.listen(port, function () {
      defaultPort = port
    })
  }
})