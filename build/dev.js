const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const portfinder = require('portfinder')
const chalk = require('chalk')

const app = express()
const config = require('./webpack.dev.conf.js')
const compiler = webpack(config)

app.use(webpackDevMiddleware(compiler))
app.use(webpackHotMiddleware(compiler))

portfinder.getPort(function (error, port) {
  if (error) {
    throw new Error(error)
  } else {
    process.env.PORT = port
    app.listen(port, function () {
      console.log(chalk.green('you application is running on http://localhost:' + port))
    })
  }
})