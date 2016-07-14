import express from 'express'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import hbs from 'express-handlebars'
import {renderFullPage, normalizePort, onError} from './config/initHelpers'

import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import reducers from './client/js/reducers/index'
import routes from './client/js/routes'
import { createHashHistory } from 'history'
import { configureStore } from './client/store'
import { syncHistoryWithStore } from 'react-router-redux'
import { match, RouterContext, createMemoryHistory  } from 'react-router'

process.env.DEBUG = 'myFullstackJsNetwork';
const debug = require('debug')('myFullstackJsNetwork')
import http from 'http'

const folderName = __dirname.substring(__dirname.length-4, __dirname.length);
if(folderName !== '/src' && folderName === 'dist'){
  process.env.NODE_ENV = 'production';
}else if(folderName === '/src' && folderName !== 'dist'){
  process.env.NODE_ENV = 'development';
}

const app = express()

app.use(helmet())

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'client/public')))

app.use('*', function timeLog(req, res, next) {
  console.log('Time: ', new Date(Date.now()).toUTCString())
  next()
})

// We are going to fill these out in the sections to follow
function handleRender(req, res, next) {
  const memoryHistory = createMemoryHistory(req.originalUrl)
  let store = configureStore(memoryHistory )
  const history = syncHistoryWithStore(memoryHistory, store)

  match({ history, routes , location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      store = configureStore(memoryHistory, store.getState() )
      const content = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps}/>
        </Provider>
      )
      res.status(200).send(renderFullPage(content, store.getState()))
    }
  })
}

// This is fired every time the server side receives a request
app.use('/*', handleRender)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)
let server = http.createServer(app)
function onListening() {
console.log("server listening at http://localhost:" + port)
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  debug('Listening on ' + bind)
}
server.on('error', onError)
server.on('listening', onListening)
server.listen(port);

export default server;
