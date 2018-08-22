require('dotenv').config()
const express = require('express')
const {existsSync} = require('fs')
const {join} = require('path')
const webpack = require('webpack')
const hmr = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const dev = require('./webpack.dev')
const prod = require('./webpack.prod')

const isDev = process.env.NODE_ENV === 'development'
const config = isDev ? dev : prod
const DIST_DIR = join(__dirname, 'dist')
const HTML_FILE = join(DIST_DIR, 'index.html')
const DEFAULT_PORT = 3000

const app = express()
app.set('port', process.env.PORT || DEFAULT_PORT)

if (isDev || !existsSync(DIST_DIR)) {
  const compiler = webpack(config)
  app.use(compiler)
  app
    .use(webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    }))
    .get('*', (req, res, next) => {
      compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
        if (err) {
          return next(err)
        }
        res.set('content-type', 'text/html')
        res.send(result)
        res.end()
      })
    })
} else {
  app.use(express.static(DIST_DIR))
  app.get('*', (req, res) => res.sendFile(HTML_FILE))
}

app.listen(app.get('port'))
