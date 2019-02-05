const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const chalk = require('chalk')
const ora = require('ora')

const app = express()
const config = require('./webpack.dev.conf.js')
const spinner = ora('Compiling for development...').start()
let compiler, instance
portfinder.getPort(function (error, port) {
  if (error) {
    throw new Error(error)
  } else {
    process.env.PORT = port
    config.plugins.unshift(
      new FriendlyErrorsWebpackPlugin({
        clearConsole: true,
        compilationSuccessInfo: {
          messages: [`You application is running here http://localhost:${process.env.PORT}`]
        }
      })
    )
    compiler = webpack(config)
    instance = webpackDevMiddleware(compiler, {
      hot: true,
      compress: true,
      watchOptions: {
        poll: true
      },
      logLevel: 'silent'
    })
    instance.waitUntilValid(() => {
      spinner.stop()
    })
    app.use(instance)
    app.use(webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 2000
    }))

    app.listen(process.env.PORT, function (error) {
      if (error) {
        throw new Error(error)
      }
    })
  }
})

